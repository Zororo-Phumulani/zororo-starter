import "./globals.css";
import Script from "next/script";
import { Providers } from "./providers";
import { Inter, Poppins } from "next/font/google";
import { Header } from "../components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  weight: ["400", "600", "700"],
  subsets: ["latin"], 
  variable: "--font-poppins" 
});

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
      <body className={`${inter.variable} ${poppins.variable} font-sans min-h-screen bg-[#fbfbf9] flex flex-col text-slate-900`}>
        <Providers>
        
        {/* Navigation Bar - matching Workspace architecture */}
        <Header />

        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Chat/Support Widget */}
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
