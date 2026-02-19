import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export interface ProgramScheduleItem {
  id: string;
  day: number;
  time_start: string;
  time_end: string;
  program: string;
  participants: string[];
  sort_order: number | null;
  created_at: string;
}

export async function GET() {
  try {
    const items = await sql<ProgramScheduleItem>`
      SELECT 
        id,
        day,
        time_start,
        time_end,
        program,
        participants,
        sort_order,
        created_at
      FROM schedule_program_items
      ORDER BY day ASC, sort_order ASC, time_start ASC
    `;

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching program schedule:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch program schedule" },
      { status: 500 },
    );
  }
}
