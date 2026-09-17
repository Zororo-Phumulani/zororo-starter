/** Pure rendering only: safe to preview/test without SMTP, secrets or a database. */
export type EmailContent = { html: string; text: string };
type ProvisionedApp = { name: string; baseUrl: string | null };

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
}

function safeUrl(value: string): string {
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || /[\r\n]/.test(value)) {
    throw new Error('Invalid email action URL');
  }
  // Preserve the exact supplied URL/token. Escape only when inserting into HTML.
  return value;
}

const paragraph = (html: string) => `<p style="margin:0 0 18px;color:#334155;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;">${html}</p>`;
const note = (html: string) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 22px;"><tr><td bgcolor="#f8f7f5" style="background-color:#f8f7f5;border-left:2px solid #123c5a;padding:14px 16px;color:#334155;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;">${html}</td></tr></table>`;

function action(label: string, rawUrl: string): string {
  const url = escapeHtml(safeUrl(rawUrl));
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;margin:4px 0 22px;"><tr><td align="center" bgcolor="#123c5a" style="background-color:#123c5a;border-radius:6px;mso-padding-alt:14px 24px;"><a href="${url}" style="display:inline-block;border:1px solid #123c5a;border-radius:6px;padding:14px 24px;color:#ffffff !important;background-color:#123c5a;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;line-height:22px;text-align:center;text-decoration:none;mso-padding-alt:0;"><span style="color:#ffffff;">${escapeHtml(label)}</span></a></td></tr></table>
  <p style="margin:0 0 6px;color:#475569;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:21px;">If the button doesn’t work, copy and paste this link into your browser:</p>
  <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:21px;word-break:break-all;overflow-wrap:anywhere;"><a href="${url}" style="color:#155e95;text-decoration:underline;word-break:break-all;">${url}</a></p>`;
}

function wrap(title: string, preheader: string, body: string, text: string): EmailContent {
  return {
    html: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background-color:#f8f7f5;color:#334155;">
<div style="display:none;font-size:1px;line-height:1px;color:#f8f7f5;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8f7f5" style="width:100%;background-color:#f8f7f5;border-collapse:collapse;"><tr><td align="center" style="padding:24px 12px;">
<!--[if mso]><table role="presentation" width="580" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:580px;table-layout:fixed;background-color:#ffffff;border:1px solid #dde1e4;border-radius:10px;border-spacing:0;">
<tr><td bgcolor="#ffffff" style="padding:28px 24px 24px;background-color:#ffffff;border-bottom:1px solid #e2e8f0;">
<p style="margin:0 0 5px;color:#123c5a;font-family:Poppins,Arial,Helvetica,sans-serif;font-size:21px;font-weight:600;line-height:29px;white-space:nowrap;letter-spacing:-0.5px;">Zororo Phumulani</p>
<p style="margin:0;color:#475569;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;line-height:16px;">YOUR ZORORO PHUMULANI ACCOUNT</p>
</td></tr>
<tr><td bgcolor="#ffffff" style="padding:32px 24px 12px;background-color:#ffffff;color:#334155;">
<h1 style="margin:0 0 18px;color:#0f172a;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:bold;line-height:35px;letter-spacing:-0.6px;">${escapeHtml(title)}</h1>
${body}
</td></tr>
<tr><td bgcolor="#f8fafc" style="padding:18px 24px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
<p style="margin:0;color:#475569;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;"><strong style="color:#123c5a;font-weight:normal;">For the ones you love.</strong><br><br>One Zororo Phumulani account for your connected apps.<br>Need help? Contact your organisation’s Identity administrator.</p>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`,
    text: `Zororo Phumulani | Identity\n\n${title}\n\n${text}\n\nFor the ones you love.\nOne Zororo Phumulani account for your connected apps.\nNeed help? Contact your organisation’s Identity administrator.`,
  };
}

export const TEMPLATES = {
  passwordReset(resetUrl: string): EmailContent {
    const url = safeUrl(resetUrl);
    return wrap('Reset your password', 'Choose a new password for your Zororo Phumulani Identity account. This link expires in 1 hour.',
      paragraph('Let’s get you back to your Zororo Phumulani account. Choose a new password using the secure link below.') +
      note('<strong style="color:#0f172a;">This link expires in 1 hour.</strong><br>For your security, keep this email and its reset link private.') +
      action('Reset password', url) +
      paragraph('<strong style="color:#123c5a;">Your second step stays in place.</strong><br>Resetting your password does not remove two-factor authentication. You’ll still need your authenticator or a saved recovery code when you sign in.') +
      paragraph('If you didn’t request this, you can safely ignore this email. Your password will stay unchanged.'),
      `We received a request to reset the password for your Zororo Phumulani Identity account.\n\nChoose a new password:\n${url}\n\nThis link expires in 1 hour. Keep this email and its reset link private.\n\nResetting your password does not remove two-factor authentication. You’ll still need your authenticator or a saved recovery code when you sign in.\n\nIf you didn’t request this, you can safely ignore this email. Your password will stay unchanged.`);
  },

  accountCreated(name: string, tempPass: string, loginUrl: string, provisionedApps: ProvisionedApp[] = []): EmailContent {
    const url = safeUrl(loginUrl);
    const appsHtml = provisionedApps.length ? paragraph('Your account has access to:') +
      `<ul style="margin:0 0 22px;padding-left:22px;color:#334155;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:26px;">${provisionedApps.map(app => {
        const appName = escapeHtml(app.name);
        let appLink: string | null = null;
        try { if (app.baseUrl) appLink = safeUrl(app.baseUrl); } catch { /* Show the name without an unsafe link. */ }
        return `<li style="padding-bottom:4px;word-break:break-word;">${appLink ? `<a href="${escapeHtml(appLink)}" style="color:#155e95;text-decoration:underline;">${appName}</a>` : appName}</li>`;
      }).join('')}</ul>` : '';
    return wrap('Your Zororo Phumulani account is ready', 'Your staff account is ready. Sign in to set up your authenticator and change your temporary password.',
      paragraph(`Hello ${escapeHtml(name)},`) +
      paragraph('Welcome to your Zororo Phumulani workspace. Your account brings the applications you need together, with one secure sign-in.') +
      paragraph('Use your work email and this temporary password to get started:') +
      note(`<strong style="color:#0f172a;">Your temporary password</strong><br><span style="color:#0f172a;font-family:Consolas,'Courier New',monospace;font-size:18px;line-height:28px;word-break:break-all;">${escapeHtml(tempPass)}</span>`) +
      paragraph('<strong style="color:#123c5a;">Three steps to settle in</strong>') +
      '<ol style="margin:0 0 24px;padding-left:22px;color:#334155;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:25px;"><li style="padding-bottom:10px;">Sign in with your work email and temporary password.</li><li style="padding-bottom:10px;">Set up your authenticator and save your recovery codes somewhere safe. If already set up, enter your current code.</li><li>Open Account security and change your temporary password.</li></ol>' +
      appsHtml + action('Sign in to Zororo Phumulani', url) +
      paragraph('Keep your temporary password private. If this account was unexpected, contact your Identity administrator.'),
      `Hello ${name},\n\nWelcome to your Zororo Phumulani workspace. Sign in with your work email.\n\nYour temporary password: ${tempPass}\n\n1. Sign in with your work email and temporary password.\n2. Set up your authenticator and save your recovery codes somewhere safe. If already set up, enter your current code.\n3. Open Account security and change your temporary password.${provisionedApps.length ? '\n\nYour applications:\n' + provisionedApps.map(app => '- ' + app.name).join('\n') : ''}\n\nSign in to Zororo Phumulani:\n${url}\n\nKeep your temporary password private. If this account was unexpected, contact your Identity administrator.`);
  },

  accessGranted(name: string, appName: string, role: string, appUrl?: string | null, workspaceUrl: string = "https://workspace.zororophumulani.co.za"): EmailContent {
    let url: string | null = null;
    try { if (appUrl) url = safeUrl(appUrl); } catch { /* Keep delivery available if a legacy URL is invalid. */ }
    const workspace = safeUrl(workspaceUrl);
    const roleLabel = ({ OWNER: "Owner", ADMIN: "Administrator", USER: "User" } as Record<string, string>)[role] || role;
    return wrap('More of your workspace, ready.', 'A new application is available with your existing Zororo Phumulani account.',
      paragraph(`Hello ${escapeHtml(name)},`) +
      paragraph('Your access is ready. Use your existing Zororo Phumulani Identity to continue.') +
      note(`<strong style="color:#0f172a;">${escapeHtml(appName)}</strong><br>Assigned role: <strong style="color:#0f172a;">${escapeHtml(roleLabel)}</strong>`) +
      (url ? action(`Open ${appName}`, url) : action('Open Workspace', workspace)) +
      paragraph(`You can also find your applications in your <a href="${escapeHtml(workspace)}" style="color:#155e95;text-decoration:underline;">Zororo Phumulani Workspace</a>.`) +
      paragraph('Your existing password and authenticator verification still apply.') +
      paragraph('If this access was unexpected or you need a different role, contact your Identity administrator.'),
      `Hello ${name},\n\nYour access is ready. Use your existing Zororo Phumulani Identity to continue.\n\nApplication: ${appName}\nAssigned role: ${roleLabel}\n\n${url ? `Open ${appName}:\n${url}\n\n` : ''}Open your Zororo Phumulani Workspace: ${workspace}. Your existing password and authenticator verification still apply.\n\nIf this access was unexpected or you need a different role, contact your Identity administrator.`);
  },
};

export function tokenExpiryEmail(name: string, application: string, expiresAt: Date): EmailContent {
  const date = expiresAt.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  const text = `Your integration token “${name}” for ${application} expires on ${date}.\n\nRequest a replacement token from your Identity administrator before it expires. Update the token in your coding assistant or integration, test the connection, then ask your administrator to revoke the old token.\n\nYour existing token will stop working at expiry. Never send your token by email.\n\nZororo Phumulani Identity`;
  return wrap('Your integration token is expiring', 'Request a replacement to keep your integration connected.', paragraph(`Your integration token <strong>${escapeHtml(name)}</strong> for ${escapeHtml(application)} expires on <strong>${escapeHtml(date)}</strong>.`) + paragraph('Request a replacement token from your Identity administrator before it expires. Update your coding assistant or integration, test the connection, then ask your administrator to revoke the old token.') + note('Your existing token will stop working at expiry. Never send your token by email.'), text);
}
