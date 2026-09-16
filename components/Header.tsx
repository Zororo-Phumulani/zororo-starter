"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Script from "next/script";
import { usePathname } from "next/navigation";

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    // Check initial theme
    const theme = localStorage.getItem("zororo-theme") || "light";
    setIsDark(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");

    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        detailsRef.current.removeAttribute("open");
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("zororo-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
  };

  // We explicitly load the switcher script here so it has access to the mount and token
  const identityToken = (session as any)?.identityAccessToken || (session as any)?.accessToken || "";

  if (pathname === '/data-heavy') {
    return null;
  }

  return (
    <header className="h-[72px] border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 shrink-0 relative z-50 transition-colors">
      <Link href="/" className="flex flex-col text-slate-900 dark:text-white no-underline whitespace-nowrap">
        <span className="font-poppins font-semibold text-[22px] leading-none">
          Zororo Phumulani
        </span>
        <span className="font-inter text-[12px] tracking-[0.05em] text-slate-500 dark:text-slate-400 mt-1.5 uppercase leading-none block">
          App Starter
        </span>
      </Link>
      
      <nav aria-label="Your account" className="flex items-center gap-4 text-[13px]">
        {/* App Switcher Target Mount */}
        <div id="zp-app-switcher-mount" className="flex items-center justify-center w-11 h-11 order-1"></div>
        <Script 
          src="https://identity.zororophumulani.co.za/switcher.js" 
          strategy="lazyOnload"
          data-token={identityToken} 
        />

        {/* Appearance Toggle */}
        <button 
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="order-3 flex items-center justify-center w-11 h-11 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Avatar & Account Menu */}
        {session && session.user && (
          <details 
            ref={detailsRef}
            className="relative order-4 group"
            onToggle={(e) => setMenuOpen((e.target as HTMLDetailsElement).open)}
          >
            <summary 
              aria-label={`Account menu for ${session.user.name}`} 
              title="Your account"
              className="list-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-full"
            >
              <style jsx>{`summary::-webkit-details-marker { display: none; }`}</style>
              <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white flex items-center justify-center font-semibold text-[14px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                {getInitials(session.user.name)}
              </div>
            </summary>
            
            <div className="absolute right-0 top-[calc(100%+8px)] w-[260px] p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <p className="font-semibold text-slate-900 dark:text-white text-[14px] m-0 truncate">
                {session.user.name}
              </p>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 mb-3 truncate">
                {session.user.email || 'Zororo Phumulani App Starter'}
              </p>
              
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 -mx-4"></div>
              
              <button 
                onClick={() => signOut()}
                className="w-full text-left px-3 py-2.5 rounded-md text-[14px] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Sign out
              </button>
            </div>
          </details>
        )}
      </nav>
    </header>
  );
}
