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
    title: "Cinesplice (Editography)",
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
    date: "2026-02-19T00:00:00Z",
    location: "Online",
    imageUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/events/online/IMG-20260124-WA0063.jpg`,
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
    price_amount: 1000,
  },

  {
    id: "duo-dance-duo-dynamics",
    title: "Duo Dynamics (Duo Dance)",
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
    date: "2026-02-19T00:00:00Z",
    location: "Online",
    imageUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/events/online/IMG-20260124-WA0062.jpg`,
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
    price_amount: 1000,
  },

  {
    id: "recreating-frame-lens-legacy",
    title: "Lens Legacy (Recreating Frame)",
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
    date: "2026-02-19T00:00:00Z",
    location: "Online",
    imageUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/events/online/IMG-20260124-WA0061.jpg`,
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
    price_amount: 1000,
  },

  {
    id: "prompt-drawing-sketch-alchemy",
    title: "Sketch Alchemy (Prompt Drawing)",
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
    date: "2026-02-19T00:00:00Z",
    location: "Online",
    imageUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/events/online/IMG-20260124-WA0059.jpg`,
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
    price_amount: 1000,
  },

  {
    id: "short-film-narratex",
    title: "Narratex (Short Film)",
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
    date: "2026-02-19T00:00:00Z",
    location: "Online",
    imageUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/events/online/IMG-20260124-WA0060.jpg`,
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
    price_amount: 5000,
  },

  {
    id: "photography-visual-odyssey",
    title: "Visual Odyssey (Photography)",
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
    date: "2026-02-19T00:00:00Z",
    location: "Online",
    imageUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/events/online/IMG-20260124-WA0058.jpg`,
    category: "Online Event",
    capacity: 1000,
    registeredCount: 0,
    price_amount: 1000,
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
        INSERT INTO events (id, title, description, date, location, image_url, category, capacity, registered_count, rules, price_amount)
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
          ${JSON.stringify(event.rules)},
          ${event.price_amount || 0}
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
          rules = EXCLUDED.rules,
          price_amount = EXCLUDED.price_amount
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
