# Zororo Phumulani Integration Starter

A minimal Next.js 14 template demonstrating how to connect a new application to the Zororo Phumulani digital ecosystem.

## Features Included
1. **Zororo Identity SSO**: Pre-configured NextAuth setup to sign in with `@zororo-identity`.
2. **App Switcher**: Injected `switcher.js` script with the target mount element.
3. **IT Support Widget**: Global floating chat widget integration for on-page help.
4. **Dark Mode**: Tailwind CSS v4 dark mode configured.

## Getting Started

### 1. Environment Setup & Configuration
To protect internal ecosystem endpoints, this repository does not include environment variable examples. 

**You must obtain the official `.env.local` configuration template from the secured Zororo Phumulani Documentation Portal.** 

Once you have copied the configuration from the documentation portal into your local `.env.local` file, ensure you replace the client ID and secret with your app's specific credentials.

**Important**: You must generate a secure, random secret for `NEXTAUTH_SECRET`. You can generate one by running the following command in your terminal:
```bash
openssl rand -base64 32
```
Copy the output and paste it as your `NEXTAUTH_SECRET` in `.env.local`.

### 2. Install & Run
Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Files to Review
* `lib/auth.ts`: NextAuth configuration linking to your configured `ZORORO_ISSUER`. 
* `app/layout.tsx`: See how the IT support `widget.js` script is mounted globally via environment variables.
* `components/Header.tsx`: Usage of `useSession()` to read the user's authenticated profile and dynamic mounting of the `switcher.js` UI.
