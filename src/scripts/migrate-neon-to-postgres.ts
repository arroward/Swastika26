import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Helper to get safe connection string
const getSafeConnectionString = (url: string | undefined) => {
  if (!url) throw new Error("Database URL is not defined");
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("sslmode");
    return parsed.toString();
  } catch {
    return url;
  }
};

// Source database (NeonDB)
const sourcePool = new Pool({
  connectionString: getSafeConnectionString(process.env.NEON_DATABASE_URL),
  ssl: {
    rejectUnauthorized: false,
  },
});

// Target database (PostgreSQL)
const targetPool = new Pool({
  connectionString: getSafeConnectionString(process.env.POSTGRES_DATABASE_URL),
  ssl: {
    rejectUnauthorized: false,
  },
});

interface MigrationStats {
  table: string;
  rowsCopied: number;
  success: boolean;
  error?: string;
}

async function initializeTargetSchema(): Promise<void> {
  console.log("\n🏗️  Initializing target database schema...");

  try {
    // Get actual schema from source database
    console.log("  🔍 Fetching schema from NeonDB...");

    // Fetch events table structure
    const eventsSchema = await sourcePool.query(`
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'events'
      ORDER BY ordinal_position
    `);

    const adminsSchema = await sourcePool.query(`
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'admins'
      ORDER BY ordinal_position
    `);

    const registrationsSchema = await sourcePool.query(`
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'event_registrations'
      ORDER BY ordinal_position
    `);

    // Create events table (drop if exists to recreate with correct schema)
    await targetPool.query(`DROP TABLE IF EXISTS admin_events CASCADE`);
    await targetPool.query(`DROP TABLE IF EXISTS event_registrations CASCADE`);
    await targetPool.query(`DROP TABLE IF EXISTS admins CASCADE`);
    await targetPool.query(`DROP TABLE IF EXISTS events CASCADE`);

    await targetPool.query(`
      CREATE TABLE events (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date TIMESTAMP NOT NULL,
        location VARCHAR(255),
        image_url TEXT,
        category VARCHAR(100),
        capacity INTEGER DEFAULT 100,
        registered_count INTEGER DEFAULT 0,
        price_amount INTEGER DEFAULT 0,
        registration_fee INTEGER DEFAULT 0,
        is_online BOOLEAN DEFAULT false,
        rules JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("  ✅ Created events table");

    // Create admins table without role constraint to allow all roles
    await targetPool.query(`
      CREATE TABLE admins (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("  ✅ Created admins table");

    // Create registrations table with all columns from source
    await targetPool.query(`
      CREATE TABLE event_registrations (
        id SERIAL PRIMARY KEY,
        event_id VARCHAR(255) REFERENCES events(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        college_name VARCHAR(255),
        university_name VARCHAR(255),
        team_size INTEGER DEFAULT 1,
        team_members JSONB,
        organization VARCHAR(255),
        upi_transaction_id VARCHAR(255),
        account_holder_name VARCHAR(255),
        upload_file_url TEXT,
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(event_id, email)
      )
    `);
    console.log("  ✅ Created event_registrations table");

    // Create admin_events junction table
    await targetPool.query(`
      CREATE TABLE admin_events (
        admin_id VARCHAR(255) REFERENCES admins(id) ON DELETE CASCADE,
        event_id VARCHAR(255) REFERENCES events(id) ON DELETE CASCADE,
        PRIMARY KEY (admin_id, event_id)
      )
    `);
    console.log("  ✅ Created admin_events table");

    console.log("  ✨ Schema initialization completed");
  } catch (error) {
    console.error("  ❌ Error initializing schema:", error);
    throw error;
  }
}

async function migrateTable(
  tableName: string,
  columns: string[],
): Promise<MigrationStats> {
  console.log(`\n📋 Migrating table: ${tableName}`);

  try {
    // Fetch data from source
    console.log(`  ⬇️  Fetching data from NeonDB...`);
    const sourceResult = await sourcePool.query(
      `SELECT * FROM ${tableName} ORDER BY 1`,
    );
    const rows = sourceResult.rows;
    console.log(`  📊 Found ${rows.length} rows`);

    if (rows.length === 0) {
      return {
        table: tableName,
        rowsCopied: 0,
        success: true,
      };
    }

    // Insert data into target in batches
    console.log(`  ⬆️  Inserting data into PostgreSQL...`);
    let copiedCount = 0;
    const batchSize = 100;

    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);

      for (const row of batch) {
        const columnNames = Object.keys(row);
        const values = Object.values(row).map((value) => {
          // Handle JSONB columns - ensure they're properly stringified
          if (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
          ) {
            return JSON.stringify(value);
          }
          if (Array.isArray(value)) {
            return JSON.stringify(value);
          }
          return value;
        });
        const placeholders = values
          .map((_, index) => `$${index + 1}`)
          .join(", ");

        const insertQuery = `
          INSERT INTO ${tableName} (${columnNames.join(", ")})
          VALUES (${placeholders})
          ON CONFLICT DO NOTHING
        `;

        try {
          await targetPool.query(insertQuery, values);
          copiedCount++;
        } catch (error: any) {
          // Log constraint violations but continue
          if (error.code === "23503" || error.code === "23505") {
            console.log(
              `    ⚠️  Skipping row due to constraint: ${error.message}`,
            );
          } else {
            throw error;
          }
        }
      }

      console.log(
        `  ✓ Progress: ${copiedCount}/${rows.length} rows (${Math.round((copiedCount / rows.length) * 100)}%)`,
      );
    }

    // Update sequence for tables with SERIAL columns
    if (tableName === "event_registrations") {
      await targetPool.query(`
        SELECT setval('event_registrations_id_seq', 
          COALESCE((SELECT MAX(id) FROM event_registrations), 1), 
          true)
      `);
      console.log(`  🔄 Updated sequence for ${tableName}`);
    }

    console.log(`  ✅ Successfully migrated ${copiedCount} rows`);

    return {
      table: tableName,
      rowsCopied: copiedCount,
      success: true,
    };
  } catch (error) {
    console.error(`  ❌ Error migrating ${tableName}:`, error);

    return {
      table: tableName,
      rowsCopied: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function verifyMigration(tableName: string): Promise<void> {
  try {
    const sourceCount = await sourcePool.query(
      `SELECT COUNT(*) FROM ${tableName}`,
    );
    const targetCount = await targetPool.query(
      `SELECT COUNT(*) FROM ${tableName}`,
    );

    const sourceTotal = parseInt(sourceCount.rows[0].count);
    const targetTotal = parseInt(targetCount.rows[0].count);

    console.log(`  📊 ${tableName}:`);
    console.log(`     Source (NeonDB): ${sourceTotal} rows`);
    console.log(`     Target (PostgreSQL): ${targetTotal} rows`);

    if (sourceTotal === targetTotal) {
      console.log(`     ✅ Row counts match`);
    } else {
      console.log(`     ⚠️  Row count mismatch!`);
    }
  } catch (error) {
    console.error(`  ❌ Error verifying ${tableName}:`, error);
  }
}

async function main() {
  console.log("🚀 Starting database migration from NeonDB to PostgreSQL\n");
  console.log("=".repeat(60));

  const stats: MigrationStats[] = [];

  try {
    // Test connections
    console.log("\n🔌 Testing database connections...");
    await sourcePool.query("SELECT 1");
    console.log("  ✅ Connected to NeonDB");
    await targetPool.query("SELECT 1");
    console.log("  ✅ Connected to PostgreSQL");

    // Initialize target database schema
    await initializeTargetSchema();

    // Tables to migrate in order (respecting foreign key dependencies)
    const tablesToMigrate = [
      { name: "events", columns: [] },
      { name: "admins", columns: [] },
      { name: "event_registrations", columns: [] },
      { name: "admin_events", columns: [] },
    ];

    // Migrate each table
    console.log("\n📦 Starting data migration...");
    console.log("=".repeat(60));

    for (const table of tablesToMigrate) {
      const result = await migrateTable(table.name, table.columns);
      stats.push(result);
    }

    // Verify migration
    console.log("\n\n🔍 Verifying migration...");
    console.log("=".repeat(60));

    for (const table of tablesToMigrate) {
      await verifyMigration(table.name);
    }

    // Print summary
    console.log("\n\n📊 Migration Summary");
    console.log("=".repeat(60));

    const successCount = stats.filter((s) => s.success).length;
    const totalRows = stats.reduce((sum, s) => sum + s.rowsCopied, 0);

    console.log(
      `\n✅ Successfully migrated: ${successCount}/${stats.length} tables`,
    );
    console.log(`📝 Total rows copied: ${totalRows}`);

    if (stats.some((s) => !s.success)) {
      console.log("\n⚠️  Failed migrations:");
      stats
        .filter((s) => !s.success)
        .forEach((s) => {
          console.log(`   ❌ ${s.table}: ${s.error}`);
        });
    }

    console.log("\n✨ Migration completed!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    // Close connections
    await sourcePool.end();
    await targetPool.end();
    console.log("\n🔌 Database connections closed");
  }
}

// Run migration
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
