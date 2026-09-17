import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { dispatchAnnouncement } from "@/lib/dispatch";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { title, content, targetType, targetIds, status, scheduledAt, template } = await req.json();

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        targetType,
        targetIds,
        status,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        template: template || "STANDARD"
      }
    });

    if (status === "PUBLISHED" && (!scheduledAt || new Date(scheduledAt) <= new Date())) {
       dispatchAnnouncement(announcement).catch(console.error);
    }

    return NextResponse.json({ success: true, announcement });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ announcements });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
