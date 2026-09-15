import "./globals.css";
import Script from "next/script";
import { Providers } from "./providers";

export const metadata = {
  title: "Zororo Starter App",
  description: "A minimal starter showing Identity and Ecosystem integration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Providers>
        
        {/* Navigation Bar */}
        <header className="h-14 border-b bg-white flex items-center justify-between px-6">
          <div className="font-bold text-lg">My Integration App</div>
          
          {/* App Switcher Target Mount */}
          <div id="zp-app-switcher-mount" className="flex items-center">
            {/* The switcher.js script will inject the React component here */}
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>

        {/* Global Chat/Support Widget */}
        {/* The data-app-code registers this widget instance. Adjust if needed. */}
        <Script
          src="https://it.zororophumulani.co.za/widget.js"
          strategy="lazyOnload"
          data-app-code="STARTER_APP"
        />

        {/* App Switcher Script */}
        <Script
          src="https://identity.zororophumulani.co.za/switcher.js"
          strategy="lazyOnload"
        />
        </Providers>
      </body>
    </html>
  );
}
