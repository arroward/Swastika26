import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file FIRST
config({ path: resolve(process.cwd(), ".env") });

// Verify DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in .env file");
  console.error(
    "Please create a .env file with DATABASE_URL=your_connection_string",
  );
  process.exit(1);
}

// Import after env is loaded
import { sql, initDatabase } from "../lib/db";

const sampleEvents = [
  {
    id: "editography-cinesplice",
    title: "Editography (Cinesplice)",
    description:
      "Editography (Cinesplice) is an online image editing competition showcasing creative enhancement skills with restrictions on advanced manipulation.",
    rules: [
      "Entry must be original and not duplicated from another participant",
      "Images from digital cameras or smartphones are allowed",
      "Only basic editing is permitted; advanced editing is prohibited",
      "No borders, logos, copyright marks, or identifying marks allowed",
      "Winners are decided based on creativity and quality",
      "50% weightage for likes and shares, 50% for judges’ decision",
      "Artificially generated likes will result in disqualification",
      "Judges’ decision will be final",
    ],
    date: "2024-04-05T00:00:00Z",
    location: "Online",
    imageUrl:
      "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/events/online/IMG-20260124-WA0063.jpg",
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
  },

  {
    id: "duo-dance-duo-dynamics",
    title: "Duo Dance (Duo Dynamics)",
    description:
      "Duo Dance (Duo Dynamics) is a short-form duo dance competition emphasizing coordination, rhythm, and expression.",
    rules: [
      "Maximum of 2 members per team",
      "Performance duration must not exceed 1 minute",
      "Camera must remain fixed during recording",
      "No transitions or visual effects allowed",
      "Multiple teams from the same college are allowed",
      "Video must be submitted in the highest possible quality",
      "Judging based on presentation and number of likes",
      "Judges’ decision is final and binding",
    ],
    date: "2024-04-05T00:00:00Z",
    location: "Online",
    imageUrl:
      "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/events/online/IMG-20260124-WA0062.jpg",
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
  },

  {
    id: "recreating-frame-lens-legacy",
    title: "Recreating Frame (Lens Legacy)",
    description:
      "Recreating Frame (Lens Legacy) celebrates cinema by recreating iconic movie scenes in a creative way.",
    rules: [
      "Entry must not be duplicated from another participant",
      "Photos can be taken using any digital camera or smartphone",
      "Any movie scene or character from any language is allowed",
      "Original frame and recreated frame must be combined into one image",
      "File size should not exceed 10 MB",
      "Accepted formats: JPG or PNG",
      "Judging based on creativity, presentation, and likes",
      "Judges’ decision will be final",
    ],
    date: "2024-04-05T00:00:00Z",
    location: "Online",
    imageUrl:
      "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/events/online/IMG-20260124-WA0061.jpg",
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
  },

  {
    id: "prompt-drawing-sketch-alchemy",
    title: "Prompt Drawing (Sketch Alchemy)",
    description:
      "Prompt Drawing (Sketch Alchemy) is an AI-based art competition using prompt-driven image generation.",
    rules: [
      "Submission must be an original AI-generated image",
      "Theme: Astronaut having tea with aliens in space",
      "Images must be generated using Stable Diffusion Web",
      "Generated images should follow a cinematic style",
      "Entries must be submitted within the specified timeframe",
      "Judging based on creativity, relevance, and aesthetics",
      "Judges’ decision will be final",
    ],
    date: "2024-04-05T00:00:00Z",
    location: "Online",
    imageUrl:
      "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/events/online/IMG-20260124-WA0059.jpg",
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
  },

  {
    id: "short-film-narratex",
    title: "Short Film (Narratex)",
    description:
      "Short Film (Narratex) is a storytelling competition for aspiring filmmakers.",
    rules: [
      "Short films must be original",
      "Copied or plagiarized content leads to disqualification",
      "Documentaries are not allowed",
      "Maximum duration of the film is 5 minutes",
      "Films can be in any language",
      "Judges’ decision is final",
    ],
    date: "2024-04-05T00:00:00Z",
    location: "Online",
    imageUrl:
      "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/events/online/IMG-20260124-WA0060.jpg",
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
  },

  {
    id: "photography-visual-odyssey",
    title: "Photography (Visual Odyssey)",
    description:
      "Photography (Visual Odyssey) is an online photography contest focused on originality and visual storytelling.",
    rules: [
      "Photographs must be original",
      "Entries from digital cameras and smartphones are allowed",
      "Basic editing is permitted",
      "Advanced editing is prohibited",
      "No borders, logos, or watermarks allowed",
      "Winners selected based on creativity and quality",
      "50% likes and shares, 50% judges’ decision",
      "Artificial engagement will result in disqualification",
      "Judges’ decision will be final",
    ],
    date: "2024-04-05T00:00:00Z",
    location: "Online",
    imageUrl:
      "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/events/online/IMG-20260124-WA0058.jpg",
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
  },
];

async function seed() {
  try {
    console.log("🌱 Starting database seeding...");

    // Initialize database tables
    await initDatabase();
    console.log("✅ Database tables initialized");

    // Insert sample events
    for (const event of sampleEvents) {
      await sql`
        INSERT INTO events (id, title, description, date, location, image_url, category, capacity, registered_count, rules)
        VALUES (
          ${event.id},
          ${event.title},
          ${event.description},
          ${event.date},
          ${event.location},
          ${event.imageUrl},
          ${event.category},
          ${event.capacity},
          ${event.registeredCount},
          ${JSON.stringify(event.rules)}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          date = EXCLUDED.date,
          location = EXCLUDED.location,
          image_url = EXCLUDED.image_url,
          category = EXCLUDED.category,
          capacity = EXCLUDED.capacity,
          registered_count = EXCLUDED.registered_count,
          rules = EXCLUDED.rules
      `;
      console.log(`✅ Inserted/Updated event: ${event.title}`);
    }

    console.log(`🎉 Successfully seeded ${sampleEvents.length} events!`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
