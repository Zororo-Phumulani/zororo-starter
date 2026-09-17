import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function dispatchAnnouncement(announcement: any) {
    let recipientIds: string[] = [];

    // Fetch users from Identity API
    const identityUrl = process.env.IDENTITY_API_URL || "http://localhost:3000";
    
    if (announcement.targetType === "ALL") {
        const res = await fetch(`${identityUrl}/api/directory/users`);
        if (res.ok) {
            const data = await res.json();
            recipientIds = data.users.map((u: any) => u.id);
        }
    } else if (announcement.targetType === "DEPARTMENT") {
        const deptIds = announcement.targetIds.join(",");
        const res = await fetch(`${identityUrl}/api/directory/users?departmentId=${deptIds}`);
        if (res.ok) {
            const data = await res.json();
            recipientIds = data.users.map((u: any) => u.id);
        }
    } else if (announcement.targetType === "BRANCH") {
        const branchIds = announcement.targetIds.join(",");
        const res = await fetch(`${identityUrl}/api/directory/users?branchId=${branchIds}`);
        if (res.ok) {
            const data = await res.json();
            recipientIds = data.users.map((u: any) => u.id);
        }
    } else if (announcement.targetType === "USERS") {
        recipientIds = announcement.targetIds;
    } else if (announcement.targetType === "AUDIENCE") {
        // Fetch audience from local DB
        const audienceIds = announcement.targetIds;
        for (const audId of audienceIds) {
            const audience = await prisma.savedAudience.findUnique({ where: { id: audId } });
            if (audience) {
                recipientIds.push(...audience.members);
            }
        }
    }

    // Deduplicate
    recipientIds = [...new Set(recipientIds)];

    const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${announcement.title}</title></head>
<body style="margin:0;padding:0;background-color:#f8f7f5;color:#334155;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8f7f5" style="width:100%;background-color:#f8f7f5;border-collapse:collapse;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;table-layout:fixed;background-color:#ffffff;border:1px solid #dde1e4;border-radius:10px;border-spacing:0;">
<tr><td bgcolor="#ffffff" style="padding:28px 24px 24px;background-color:#ffffff;border-bottom:1px solid #e2e8f0;">
<p style="margin:0 0 5px;color:#123c5a;font-family:Poppins,Arial,Helvetica,sans-serif;font-size:21px;font-weight:600;line-height:29px;white-space:nowrap;letter-spacing:-0.5px;">Zororo Phumulani</p>
<p style="margin:0;color:#475569;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;line-height:16px;">INTERNAL ANNOUNCEMENT</p>
</td></tr>
<tr><td bgcolor="#ffffff" style="padding:32px 24px 12px;background-color:#ffffff;color:#334155;">
<h1 style="margin:0 0 18px;color:#0f172a;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:bold;line-height:35px;letter-spacing:-0.6px;">${announcement.title}</h1>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;">
${announcement.content}
</div>
</td></tr>
<tr><td bgcolor="#f8fafc" style="padding:18px 24px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
<p style="margin:0;color:#475569;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;"><strong style="color:#123c5a;font-weight:normal;">For the ones you love.</strong><br><br>Sent via Zororo Phumulani Announcements.</p>
</td></tr></table>
</td></tr></table></body></html>`;

    for (const id of recipientIds) {
        // Send to zororo-notifications API
        try {
            await fetch(process.env.NOTIFICATIONS_API_URL || "http://localhost:3001/api/notify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NOTIFY_API_KEY}`
                },
                body: JSON.stringify({
                    event: "announcement.published",
                    recipient: { type: "user", id: id },
                    title: announcement.title,
                    message: html,
                    channels: ["email", "in_app"],
                    priority: announcement.template === "ALERT" ? "high" : "normal"
                })
            });
        } catch (e) {
            console.error("Failed to notify", e);
        }
    }
}
