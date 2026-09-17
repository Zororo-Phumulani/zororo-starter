import { NextRequest, NextResponse } from "next/server";
import { TEMPLATES } from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();

    // In a real app we'd map "template" parameter (e.g. STANDARD, ALERT) to different templates.
    // For now, we will use a generic wrapper similar to the identity templates.
    // Since TEMPLATES in identity was specific, we'll create a custom one here if needed,
    // or just construct one using the same style.
    
    const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${title || 'Announcement'}</title></head>
<body style="margin:0;padding:0;background-color:#f8f7f5;color:#334155;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8f7f5" style="width:100%;background-color:#f8f7f5;border-collapse:collapse;"><tr><td align="center" style="padding:24px 12px;">
<!--[if mso]><table role="presentation" width="580" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;table-layout:fixed;background-color:#ffffff;border:1px solid #dde1e4;border-radius:10px;border-spacing:0;">
<tr><td bgcolor="#ffffff" style="padding:28px 24px 24px;background-color:#ffffff;border-bottom:1px solid #e2e8f0;">
<p style="margin:0 0 5px;color:#123c5a;font-family:Poppins,Arial,Helvetica,sans-serif;font-size:21px;font-weight:600;line-height:29px;white-space:nowrap;letter-spacing:-0.5px;">Zororo Phumulani</p>
<p style="margin:0;color:#475569;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;line-height:16px;">INTERNAL ANNOUNCEMENT</p>
</td></tr>
<tr><td bgcolor="#ffffff" style="padding:32px 24px 12px;background-color:#ffffff;color:#334155;">
<h1 style="margin:0 0 18px;color:#0f172a;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:bold;line-height:35px;letter-spacing:-0.6px;">${title}</h1>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;">
${content}
</div>
</td></tr>
<tr><td bgcolor="#f8fafc" style="padding:18px 24px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
<p style="margin:0;color:#475569;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;"><strong style="color:#123c5a;font-weight:normal;">For the ones you love.</strong><br><br>Sent via Zororo Phumulani Announcements.</p>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;

    return NextResponse.json({ html });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
