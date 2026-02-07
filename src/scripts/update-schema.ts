import { Client, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

async function updateSchema() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Starting database schema update...");

    const sql = async (text: string) => client.query(text);

    // Add new columns to event_registrations table if they don't exist
    console.log("Adding college_name column...");
    await sql(`
      ALTER TABLE event_registrations 
      ADD COLUMN IF NOT EXISTS college_name VARCHAR(255)
    `);

    console.log("Adding university_name column...");
    await sql(`
      ALTER TABLE event_registrations 
      ADD COLUMN IF NOT EXISTS university_name VARCHAR(255)
    `);

    console.log("Adding team_size column...");
    await sql(`
      ALTER TABLE event_registrations 
      ADD COLUMN IF NOT EXISTS team_size INTEGER DEFAULT 1
    `);

    console.log("Adding team_members column...");
    await sql(`
      ALTER TABLE event_registrations 
      ADD COLUMN IF NOT EXISTS team_members JSONB
    `);

    // Remove organization column if it exists
    console.log("Removing organization column if it exists...");
    await sql(`
      ALTER TABLE event_registrations 
      DROP COLUMN IF EXISTS organization
    `);

    console.log("✅ Database schema updated successfully!");

    // Display current schema
    console.log("\nFetching current table structure...");
    const columns = await client.query(`
      SELECT column_name, data_type, character_maximum_length, column_default
      FROM information_schema.columns
      WHERE table_name = 'event_registrations'
      ORDER BY ordinal_position
    `);

    console.log("\nCurrent event_registrations table structure:");
    columns.rows.forEach((col: any) => {
      console.log(
        `  - ${col.column_name}: ${col.data_type}${col.character_maximum_length ? `(${col.character_maximum_length})` : ""}${col.column_default ? ` DEFAULT ${col.column_default}` : ""}`,
      );
    });

    await client.end();
  } catch (error) {
    console.error("❌ Error updating schema:", error);
    if (client) await client.end();
    throw error;
  }
}

updateSchema()
  .then(() => {
    console.log("\n✅ Schema update completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Schema update failed:", error);
    process.exit(1);
  });
