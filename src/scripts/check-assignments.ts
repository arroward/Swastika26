import { Client } from "pg";
import "dotenv/config";

async function checkAssignments() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("=== Checking Admin-Event Assignments ===\n");

    const assignments = await client.query(`
      SELECT 
        a.email,
        a.name,
        a.role,
        e.title as event_title
      FROM admin_events ae
      JOIN admins a ON ae.admin_id = a.id
      JOIN events e ON ae.event_id = e.id
      ORDER BY a.email
    `);

    if (assignments.rows.length === 0) {
      console.log("❌ No event assignments found!");
      console.log("\nChecking if coordinators exist...");

      const coordinators = await client.query(`
        SELECT id, email, name FROM admins WHERE role = 'event_coordinator'
      `);
      console.log(`Found ${coordinators.rows.length} coordinators:`);
      coordinators.rows.forEach((c) => console.log(`  - ${c.email}`));

      console.log("\nChecking if events exist...");
      const events = await client.query(`
        SELECT id, title FROM events
      `);
      console.log(`Found ${events.rows.length} events:`);
      events.rows.forEach((e) => console.log(`  - ${e.title}`));
    } else {
      console.log(`✅ Found ${assignments.rows.length} assignments:\n`);
      assignments.rows.forEach((a) => {
        console.log(`${a.name} (${a.email})`);
        console.log(`  → ${a.event_title}\n`);
      });
    }

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    if (client) await client.end();
    process.exit(1);
  }
}

checkAssignments();
