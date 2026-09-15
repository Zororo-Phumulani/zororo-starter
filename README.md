# Zororo Phumulani Integration Starter

A minimal Next.js 14 template demonstrating how to connect a new application to the Zororo Phumulani digital ecosystem.

## Features Included
1. **Zororo Identity SSO**: Pre-configured NextAuth setup to sign in with `@zororo-identity`.
2. **App Switcher**: Injected `switcher.js` script with the target mount element.
3. **IT Support Widget**: Global floating chat widget integration for on-page help.

## Getting Started

1. Copy `.env.example` to `.env.local`
2. Update the environment variables with your specific OAuth client credentials obtained from the Identity admin panel.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Key Files to Review
* `lib/auth.ts`: NextAuth configuration linking to `https://identity.zororophumulani.co.za`.
* `app/layout.tsx`: See how `switcher.js` and `widget.js` are loaded via Next.js `<Script>` tags.
* `app/page.tsx`: Usage of `useSession()` to read the user's authenticated profile.
