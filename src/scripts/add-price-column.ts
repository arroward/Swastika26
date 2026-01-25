import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file
config({ path: resolve(process.cwd(), ".env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.DATABASE_URL);

async function addPriceColumn() {
  try {
    console.log("Starting database schema update for Price...");

    // Add price_amount column to events table
    console.log("Adding price_amount column to events table...");
    await sql`
      ALTER TABLE events 
      ADD COLUMN IF NOT EXISTS price_amount INTEGER DEFAULT 0
    `;

    console.log("✅ Database schema updated successfully!");
    console.log("  - Added 'price_amount' column to 'events' table");
  } catch (error) {
    console.error("❌ Error updating schema:", error);
    throw error;
  }
}

addPriceColumn().then(() => {
  console.log("\n✅ Schema update completed successfully!");
  process.exit(0);
});
