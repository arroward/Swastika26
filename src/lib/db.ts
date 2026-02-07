import { Pool, neonConfig, QueryResultRow } from "@neondatabase/serverless";
import ws from "ws";

// Configure WebSocket for Node.js environment (required for serverless/Edge functions that use WS)
neonConfig.webSocketConstructor = ws;

import { Event, AdminRole } from "@/types/event";

// -----------------------------------------------------------------------------
// POSTGRES DATABASE CONNECTION
// -----------------------------------------------------------------------------

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Clean connection string to remove sslmode param which causes warnings with pg
// because we are explicitly setting the ssl config object below.
const getSafeConnectionString = (url: string) => {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("sslmode");
    return parsed.toString();
  } catch {
    return url;
  }
};

export const pool = new Pool({
  connectionString: getSafeConnectionString(process.env.DATABASE_URL),
  // ssl: true, // @neondatabase/serverless handles SSL automatically, but explicit config can be safe
  // connectionString usually implies SSL for Neon.
  max: 2, // Reduced to 2 for optimal serverless performance (avoids connection exhaustion)
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000, // Slightly reduced timeout
});

// Helper for template literal SQL to mimic the previous 'neon' sql tag behavior
// This allows us to keep most of the codebase without rewriting every query,
// and leverages the serverless-friendly Pool
export async function sql<T extends QueryResultRow = any>(
  strings: TemplateStringsArray,
  ...values: any[]
) {
  let text = strings[0];
  const queryValues = [];

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    queryValues.push(value);
    text += `$${queryValues.length}${strings[i + 1]}`;
  }

  let retries = 3;
  while (retries > 0) {
    try {
      const res = await pool.query<T>(text, queryValues);
      return res.rows;
    } catch (error: any) {
      const isNetworkError =
        error.code === 'ETIMEDOUT' ||
        error.code === 'ECONNRESET' ||
        error.code === '57P01' || // administrator command: terminating connection due to administrator command
        (error.message && error.message.includes('closed'));

      if (isNetworkError && retries > 1) {
        console.warn(`Database connection error (${error.code || 'unknown'}), retrying... (${retries - 1} attempts left)`);
        retries--;
        await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries))); // Exponential backoff: 1s, 2s, 3s
        continue;
      }

      console.error("SQL Error:", error);
      throw error;
    }
  }
}

// -----------------------------------------------------------------------------
// Database initialization and Helper Functions
// -----------------------------------------------------------------------------

export async function initDatabase() {
  try {
    // Create events table
    await sql`
      CREATE TABLE IF NOT EXISTS events (
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
    `;

    // Create registrations table
    await sql`
      CREATE TABLE IF NOT EXISTS event_registrations (
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
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(event_id, email)
      )
    `;

    // Create admins table
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('superadmin', 'event_coordinator')),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create admin_events junction table for event coordinators
    await sql`
      CREATE TABLE IF NOT EXISTS admin_events (
        admin_id VARCHAR(255) REFERENCES admins(id) ON DELETE CASCADE,
        event_id VARCHAR(255) REFERENCES events(id) ON DELETE CASCADE,
        PRIMARY KEY (admin_id, event_id)
      )
    `;

    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

import { unstable_cache } from "next/cache";

// ... (keep previous code)

// Helper functions for events
export const getEvents = unstable_cache(
  async (): Promise<Event[]> => {
    try {
      const events = await sql`
        SELECT 
          id,
          title,
          description,
          date,
          location,
          image_url as "imageUrl",
          category,
          capacity,
          registered_count as "registeredCount",
          price_amount as "price",
          COALESCE(registration_fee, price_amount, 0) as "registrationFee",
          is_online as "isOnline",
          "rules"
        FROM events
        ORDER BY date ASC
      `;
      return events as Event[];
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  },
  ["all_events"],
  { revalidate: 60, tags: ["events"] }
);

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const events = await sql`
      SELECT 
        id,
        title,
        description,
        date,
        location,
        image_url as "imageUrl",
        category,
        capacity,
        registered_count as "registeredCount",
        price_amount as "price",
        COALESCE(registration_fee, price_amount, 0) as "registrationFee",
        is_online as "isOnline",
        "rules"
      FROM events
      WHERE id = ${id}
    `;
    return (events[0] as Event) || null;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const events = (await getEvents()) || [];

    const createSlug = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim();

    return events.find((e) => createSlug(e.title) === slug) || null;
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    return null;
  }
}

export async function registerForEvent(registration: {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  universityName: string;
  teamSize: number;
  teamMembers?: string[];
  upiTransactionId?: string;
  accountHolderName?: string;
  uploadFileUrl?: string;
}) {
  try {
    // Note: complex nested objects like string array for teamMembers need JSON.stringify
    // The previous implementation did this explicitly in the template string
    const teamMembersJson = JSON.stringify(registration.teamMembers || []);

    const result = await sql`
      INSERT INTO event_registrations (
        event_id, 
        full_name, 
        email, 
        phone, 
        college_name, 
        university_name, 
        team_size, 
        team_members,
        upi_transaction_id,
        account_holder_name,
        upload_file_url
      )
      VALUES (
        ${registration.eventId}, 
        ${registration.fullName}, 
        ${registration.email}, 
        ${registration.phone}, 
        ${registration.collegeName}, 
        ${registration.universityName}, 
        ${registration.teamSize}, 
        ${teamMembersJson},
        ${registration.upiTransactionId || null},
        ${registration.accountHolderName || null},
        ${registration.uploadFileUrl || null}
      )
      RETURNING id
    `) || [];

    // Update registered count
    await sql`
      UPDATE events
      SET registered_count = registered_count + 1
      WHERE id = ${registration.eventId}
    `;

    return result[0];
  } catch (error) {
    console.error("Error registering for event:", error);
    throw error;
  }
}

// Admin authentication
export async function getAdminByEmail(email: string) {
  try {
    const result = (await sql`
      SELECT 
        id,
        email,
        password,
        role,
        name
      FROM admins
      WHERE email = ${email}
    `) || [];
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching admin:", error);
    return null;
  }
}

// Get events for admin (coordinator sees only their events)
export async function getAdminEvents(adminId: string, role: string) {
  try {
    if (role === "superadmin") {
      return await getEvents();
    } else {
      // Event coordinator - get only their events
      const events = await sql`
        SELECT 
          e.id,
          e.title,
          e.description,
          e.date,
          e.location,
          e.image_url as "imageUrl",
          e.category,
          e.capacity,
          e.registered_count as "registeredCount",
          COALESCE(e.registration_fee, e.price_amount, 0) as "registrationFee",
          e."rules"
        FROM events e
        INNER JOIN admin_events ae ON e.id = ae.event_id
        WHERE ae.admin_id = ${adminId}
        ORDER BY e.date ASC
      `;
      return events as Event[];
    }
  } catch (error) {
    console.error("Error fetching admin events:", error);
    return [];
  }
}

// Get registrations for an event
export async function getEventRegistrations(eventId: string) {
  try {
    const registrations = await sql`
      SELECT 
        r.id,
        r.event_id as "eventId",
        e.title as "eventTitle",
        r.full_name as "fullName",
        r.email,
        r.phone,
        r.college_name as "collegeName",
        r.university_name as "universityName",
        r.team_size as "teamSize",
        r.team_members as "teamMembers",
        r.upi_transaction_id as "upiTransactionId",
        r.account_holder_name as "accountHolderName",
        r.upload_file_url as "uploadFileUrl",
        r.registration_date as "registrationDate"
      FROM event_registrations r
      INNER JOIN events e ON r.event_id = e.id
      WHERE r.event_id = ${eventId}
      ORDER BY r.registration_date DESC
    `;
    return registrations;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
}

// Get all registrations (for superadmin)
export async function getAllRegistrations() {
  try {
    const registrations = await sql`
      SELECT 
        r.id,
        r.event_id as "eventId",
        e.title as "eventTitle",
        r.full_name as "fullName",
        r.email,
        r.phone,
        r.college_name as "collegeName",
        r.university_name as "universityName",
        r.team_size as "teamSize",
        r.team_members as "teamMembers",
        r.upi_transaction_id as "upiTransactionId",
        r.account_holder_name as "accountHolderName",
        r.upload_file_url as "uploadFileUrl",
        r.registration_date as "registrationDate"
      FROM event_registrations r
      INNER JOIN events e ON r.event_id = e.id
      ORDER BY r.registration_date DESC
    `;
    return registrations;
  } catch (error) {
    console.error("Error fetching all registrations:", error);
    return [];
  }
}

// Get registrations for coordinator's events
export async function getCoordinatorRegistrations(adminId: string) {
  try {
    const registrations = await sql`
      SELECT 
        r.id,
        r.event_id as "eventId",
        e.title as "eventTitle",
        r.full_name as "fullName",
        r.email,
        r.phone,
        r.college_name as "collegeName",
        r.university_name as "universityName",
        r.team_size as "teamSize",
        r.team_members as "teamMembers",
        r.upi_transaction_id as "upiTransactionId",
        r.account_holder_name as "accountHolderName",
        r.upload_file_url as "uploadFileUrl",
        r.registration_date as "registrationDate"
      FROM event_registrations r
      INNER JOIN events e ON r.event_id = e.id
      INNER JOIN admin_events ae ON e.id = ae.event_id
      WHERE ae.admin_id = ${adminId}
      ORDER BY r.registration_date DESC
    `;
    return registrations;
  } catch (error) {
    console.error("Error fetching coordinator registrations:", error);
    return [];
  }
}

export async function getRegistrationsByEvent(eventId: string) {
  try {
    const registrations = await sql`
      SELECT 
        id,
        event_id as "eventId",
        full_name as "fullName",
        email,
        phone,
        college_name as "collegeName",
        university_name as "universityName",
        team_size as "teamSize",
        team_members as "teamMembers",
        upi_transaction_id as "upiTransactionId",
        account_holder_name as "accountHolderName",
        upload_file_url as "uploadFileUrl",
        registration_date as "registrationDate"
      FROM event_registrations
      WHERE event_id = ${eventId}
      ORDER BY registration_date DESC
    `;
    return registrations;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
}

export async function getAdminManagedEvents(adminId: string): Promise<Event[]> {
  try {
    const events = await sql`
      SELECT 
        e.id,
        e.title,
        e.description,
        e.date,
        e.location,
        e.image_url as "imageUrl",
        e.category,
        e.capacity,
        e.registered_count as "registeredCount",
        e."rules"
      FROM events e
      JOIN admin_events ae ON e.id = ae.event_id
      WHERE ae.admin_id = ${adminId}
      ORDER BY e.date ASC
    `;
    return events as Event[];
  } catch (error) {
    console.error("Error fetching admin managed events:", error);
    return [];
  }
}

export async function createAdmin(admin: {
  id: string;
  email: string;
  password: string;
  role: AdminRole;
  name: string;
}) {
  try {
    await sql`
      INSERT INTO admins (id, email, password, role, name)
      VALUES (${admin.id}, ${admin.email}, ${admin.password}, ${admin.role}, ${admin.name})
    `;
    return true;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
}

export async function assignEventToCoordinator(
  adminId: string,
  eventId: string,
) {
  try {
    await sql`
      INSERT INTO admin_events (admin_id, event_id)
      VALUES (${adminId}, ${eventId})
      ON CONFLICT DO NOTHING
    `;
    return true;
  } catch (error) {
    console.error("Error assigning event to coordinator:", error);
    throw error;
  }
}

// Get event IDs assigned to an admin
export async function getAdminEventIds(adminId: string): Promise<string[]> {
  try {
    const result = (await sql`
      SELECT event_id
      FROM admin_events
      WHERE admin_id = ${adminId}
    `) || [];
    return result.map((row: any) => row.event_id);
  } catch (error) {
    console.error("Error fetching admin event IDs:", error);
    return [];
  }
}

// Update event assignments for an admin (removes old assignments and adds new ones)
export async function updateAdminEventAssignments(
  adminId: string,
  eventIds: string[],
) {
  try {
    // Remove all existing assignments
    await sql`
      DELETE FROM admin_events
      WHERE admin_id = ${adminId}
    `;

    // Add new assignments
    if (eventIds.length > 0) {
      // Manual loop for separate inserts, as bulk insert is tricky with simple sql helper
      for (const eventId of eventIds) {
        await sql`
          INSERT INTO admin_events (admin_id, event_id)
          VALUES (${adminId}, ${eventId})
          ON CONFLICT DO NOTHING
        `;
      }
    }
    return true;
  } catch (error) {
    console.error("Error updating admin event assignments:", error);
    throw error;
  }
}

// Get all admins (for superadmin)
export async function getAllAdmins() {
  try {
    const admins = await sql`
      SELECT 
        id,
        email,
        role,
        name,
        created_at as "createdAt"
      FROM admins
      ORDER BY created_at DESC
    `;
    return admins;
  } catch (error) {
    console.error("Error fetching all admins:", error);
    return [];
  }
}

// Update admin details (for superadmin)
// Refactored to use dynamic query building for pg
export async function updateAdmin(
  adminId: string,
  updates: {
    email?: string;
    password?: string;
    role?: string;
    name?: string;
  },
) {
  try {
    const setParts: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (updates.email) {
      setParts.push(`email = $${idx++}`);
      values.push(updates.email);
    }
    if (updates.password) {
      setParts.push(`password = $${idx++}`);
      values.push(updates.password);
    }
    if (updates.role) {
      setParts.push(`role = $${idx++}`);
      values.push(updates.role);
    }
    if (updates.name) {
      setParts.push(`name = $${idx++}`);
      values.push(updates.name);
    }

    if (setParts.length === 0) {
      return false;
    }

    values.push(adminId);
    const query = `UPDATE admins SET ${setParts.join(", ")} WHERE id = $${idx}`;

    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
}

// Delete admin (for superadmin)
export async function deleteAdmin(adminId: string) {
  try {
    await sql`
      DELETE FROM admins
      WHERE id = ${adminId}
    `;
    return true;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
}

// Event management functions (for superadmin)
export async function createEvent(event: {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  category: string;
  capacity: number;
}) {
  try {
    await sql`
      INSERT INTO events (id, title, description, date, location, image_url, category, capacity, registered_count)
      VALUES (${event.id}, ${event.title}, ${event.description}, ${event.date}, ${event.location}, ${event.imageUrl}, ${event.category}, ${event.capacity}, 0)
    `;
    return true;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

export async function updateEvent(
  eventId: string,
  updates: {
    title?: string;
    description?: string;
    date?: string;
    location?: string;
    imageUrl?: string;
    category?: string;
    capacity?: number;
  },
) {
  try {
    const setParts: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (updates.title) {
      setParts.push(`title = $${idx++}`);
      values.push(updates.title);
    }
    if (updates.description) {
      setParts.push(`description = $${idx++}`);
      values.push(updates.description);
    }
    if (updates.date) {
      setParts.push(`date = $${idx++}`);
      values.push(updates.date);
    }
    if (updates.location) {
      setParts.push(`location = $${idx++}`);
      values.push(updates.location);
    }
    if (updates.imageUrl) {
      setParts.push(`image_url = $${idx++}`);
      values.push(updates.imageUrl);
    }
    if (updates.category) {
      setParts.push(`category = $${idx++}`);
      values.push(updates.category);
    }
    if (updates.capacity !== undefined) {
      setParts.push(`capacity = $${idx++}`);
      values.push(updates.capacity);
    }

    if (setParts.length === 0) {
      return false;
    }

    values.push(eventId);
    const query = `UPDATE events SET ${setParts.join(", ")} WHERE id = $${idx}`;

    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

export async function deleteEvent(eventId: string) {
  try {
    await sql`
      DELETE FROM events
      WHERE id = ${eventId}
    `;
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}
