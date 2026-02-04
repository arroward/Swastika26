import prisma from "./prisma";
import { Event, EventRegistration } from "@prisma/client";

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
  return prisma.event.create({
    data: {
      ...eventData,
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
  return prisma.event.update({
    where: { id },
    data,
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
  return prisma.eventRegistration.create({
    data: registrationData,
  });
}

/**
 * Get event registrations
 */
export async function getEventRegistrations(
  eventId: string,
): Promise<EventRegistration[]> {
  return prisma.eventRegistration.findMany({
    where: { eventId },
    orderBy: { registrationDate: "desc" },
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
    orderBy: { registrationDate: "desc" },
  });
}

/**
 * Update registration
 */
export async function updateRegistration(
  id: string,
  data: Partial<Omit<EventRegistration, "id" | "createdAt" | "updatedAt">>,
): Promise<EventRegistration> {
  return prisma.eventRegistration.update({
    where: { id },
    data,
  });
}

/**
 * Delete registration
 */
export async function deleteRegistration(
  id: string,
): Promise<EventRegistration> {
  return prisma.eventRegistration.delete({
    where: { id },
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
export async function createAdmin(email: string, role: string = "user") {
  return prisma.admin.create({
    data: { email, role },
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
