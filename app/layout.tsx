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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans min-h-screen bg-[#fbfbf9] dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-50 transition-colors`}>
        <Providers>
        
        {/* Navigation Bar - matching Workspace architecture */}
        <Header />

        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Chat/Support Widget */}
        {process.env.NEXT_PUBLIC_WIDGET_URL && (
          <Script
            src={process.env.NEXT_PUBLIC_WIDGET_URL}
            strategy="lazyOnload"
            data-app-code="STARTER_APP"
          />
        )}
        </Providers>
      </body>
    </html>
  );
}
