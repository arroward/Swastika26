import prisma from "./prisma";
import { Event, EventRegistration, Prisma } from "@prisma/client";

/**
 * Initialize database - ensures schema is ready
 */
export async function initDatabase() {
  try {
    console.log("Initializing database connection with Prisma...");
    // Test connection
    await prisma.event.findFirst();
    console.log("✅ Database connection successful!");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
}

/**
 * Create an event
 */
export async function createEvent(
  eventData: Omit<Event, "id" | "createdAt" | "updatedAt" | "registeredCount">,
): Promise<Event> {
  const { rules, ...rest } = eventData;
  return prisma.event.create({
    data: {
      ...rest,
      id: crypto.randomUUID(), // Explicitly generate ID to satisfy strict types
      rules: rules === null ? Prisma.JsonNull : rules ?? undefined,
    },
  });
}

/**
 * Get event by ID
 */
export async function getEventById(id: string): Promise<Event | null> {
  return prisma.event.findUnique({
    where: { id },
  });
}

/**
 * Get all events
 */
export async function getAllEvents(): Promise<Event[]> {
  return prisma.event.findMany({
    orderBy: { date: "asc" },
  });
}

/**
 * Update event
 */
export async function updateEvent(
  id: string,
  data: Partial<Omit<Event, "id" | "createdAt" | "updatedAt">>,
): Promise<Event> {
  const { rules, ...rest } = data;
  const updateData: Prisma.EventUpdateInput = { ...rest };
  if (rules !== undefined) {
    updateData.rules = rules === null ? Prisma.JsonNull : rules;
  }
  return prisma.event.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Delete event
 */
export async function deleteEvent(id: string): Promise<Event> {
  return prisma.event.delete({
    where: { id },
  });
}

/**
 * Register for an event
 */
export async function registerForEvent(
  registrationData: Omit<EventRegistration, "id" | "createdAt" | "updatedAt">,
): Promise<EventRegistration> {
  const { team_members, ...rest } = registrationData;
  return prisma.eventRegistration.create({
    data: {
      ...rest,
      team_members: team_members === null ? Prisma.JsonNull : team_members ?? undefined,
    },
  });
}

/**
 * Get event registrations
 */
export async function getEventRegistrations(
  eventId: string,
): Promise<EventRegistration[]> {
  return prisma.eventRegistration.findMany({
    where: { event_id: eventId },
    orderBy: { registration_date: "desc" },
  });
}

/**
 * Get user registrations
 */
export async function getUserRegistrations(
  email: string,
): Promise<EventRegistration[]> {
  return prisma.eventRegistration.findMany({
    where: { email },
    orderBy: { registration_date: "desc" },
  });
}

/**
 * Update registration
 */
export async function updateRegistration(
  id: string | number,
  data: Partial<Omit<EventRegistration, "id" | "createdAt" | "updatedAt">>,
): Promise<EventRegistration> {
  const { team_members, ...rest } = data;
  const updateData: Prisma.EventRegistrationUpdateInput = { ...rest };
  if (team_members !== undefined) {
    updateData.team_members = team_members === null ? Prisma.JsonNull : team_members;
  }
  return prisma.eventRegistration.update({
    where: { id: Number(id) },
    data: updateData,
  });
}

/**
 * Delete registration
 */
export async function deleteRegistration(
  id: string | number,
): Promise<EventRegistration> {
  return prisma.eventRegistration.delete({
    where: { id: Number(id) },
  });
}

/**
 * Get admin users
 */
export async function getAdmins(role?: string) {
  return prisma.admin.findMany(role ? { where: { role } } : undefined);
}

/**
 * Create admin
 */
export async function createAdmin(email: string, role: string = "user", name: string = "Admin", password: string = "change-me") {
  return prisma.admin.create({
    data: {
      id: crypto.randomUUID(), // Explicitly generate ID to satisfy strict types
      email,
      role,
      name,
      password
    },
  });
}

/**
 * Check if user is admin
 */
export async function isAdmin(email: string): Promise<boolean> {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });
  return !!admin;
}

export default {
  initDatabase,
  createEvent,
  getEventById,
  getAllEvents,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventRegistrations,
  getUserRegistrations,
  updateRegistration,
  deleteRegistration,
  getAdmins,
  createAdmin,
  isAdmin,
  prisma,
};
