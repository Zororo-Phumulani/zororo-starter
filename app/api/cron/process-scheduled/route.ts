import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { dispatchAnnouncement } from "@/lib/dispatch";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const now = new Date();
    const dueAnnouncements = await prisma.announcement.findMany({
      where: {
        status: "SCHEDULED",
        scheduledAt: { lte: now }
      }
    });

    if (dueAnnouncements.length === 0) {
      return NextResponse.json({ message: "No scheduled announcements due." });
    }

    const processed = [];
    
    for (const ann of dueAnnouncements) {
      await dispatchAnnouncement(ann);
      
      await prisma.announcement.update({
        where: { id: ann.id },
        data: { status: "PUBLISHED" }
      });
      processed.push(ann.id);
    }

    return NextResponse.json({ success: true, processed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
