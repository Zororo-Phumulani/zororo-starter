import "./globals.css";
import Script from "next/script";
import { Providers } from "./providers";
import { Inter, Poppins } from "next/font/google";
import { LayoutGrid, AppWindow } from "lucide-react";

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
        
        {/* Navigation Bar - following ZDES Rules */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            {/* App Identity Block */}
            <div className="flex items-center justify-center w-10 h-10 rounded bg-slate-900 text-white shrink-0">
              <AppWindow className="w-5 h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-base leading-tight text-slate-900 font-inter">
                App Starter
              </span>
              <span className="font-poppins font-semibold text-[11px] uppercase tracking-wider text-slate-500 leading-tight">
                Zororo Phumulani
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* App Switcher Target Mount */}
            <div id="zp-app-switcher-mount" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
              {/* The switcher.js script will inject the React component here */}
            </div>
          </div>
        </header>

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
