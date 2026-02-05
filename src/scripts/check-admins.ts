import { Client } from "pg";
import "dotenv/config";

async function checkAdmins() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Checking admins table...");

    const result = await client.query(`
      SELECT id, email, role, name, created_at 
      FROM admins 
      ORDER BY created_at DESC
    `);

    console.log(`\nFound ${result.rows.length} admins:`);
    console.log(JSON.stringify(result.rows, null, 2));

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    if (client) await client.end();
    process.exit(1);
  }
}

checkAdmins();
