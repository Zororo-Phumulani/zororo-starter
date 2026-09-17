import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    try {
        if (type === "audiences") {
            const audiences = await prisma.savedAudience.findMany();
            return NextResponse.json({ audiences });
        }

        const identityUrl = process.env.IDENTITY_API_URL || "http://localhost:3000";
        if (type === "departments") {
            const res = await fetch(`${identityUrl}/api/directory/departments`);
            const data = await res.json();
            return NextResponse.json(data);
        }
        if (type === "branches") {
            const res = await fetch(`${identityUrl}/api/directory/branches`);
            const data = await res.json();
            return NextResponse.json(data);
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
