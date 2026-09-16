"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun, ExternalLink, LogOut, Settings } from "lucide-react";
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
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && detailsRef.current?.open) {
        detailsRef.current.removeAttribute("open");
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  const toggleTheme = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
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
    <header className="h-[72px] border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 relative z-50 transition-colors">
      <div className="w-full max-w-[1248px] mx-auto px-[24px] flex items-center justify-between">
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
                <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white flex items-center justify-center font-semibold text-[13px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  {getInitials(session.user.name)}
                </div>
              </summary>
              
              <div className="absolute right-0 top-[56px] w-[260px] max-w-[calc(100vw-48px)] p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-20">
                <p className="font-semibold text-slate-900 dark:text-white text-[15px] m-0 break-words">
                  {session.user.name}
                </p>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 mb-3">
                  Zororo Phumulani App Starter
                </p>
                
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 -mx-4"></div>
                
                {/* Theme Switch */}
                <div 
                  className="flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-md pl-3 pr-1 py-1 text-[14px] text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={toggleTheme}
                >
                  <span>Appearance</span>
                  <button 
                    type="button"
                    aria-label="Toggle dark mode"
                    title="Switch appearance"
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 -mx-4"></div>

                <a
                  href="https://identity.zororophumulani.co.za/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] w-full items-center justify-between rounded-md pl-3 pr-1 py-1 text-[14px] text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors no-underline"
                >
                  <span>Account security</span>
                  <div className="inline-flex size-11 shrink-0 items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                </a>
                
                <button 
                  onClick={() => signOut()}
                  className="flex min-h-[44px] w-full items-center justify-between rounded-md pl-3 pr-1 py-1 text-[14px] text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <span>Sign out</span>
                  <div className="inline-flex size-11 shrink-0 items-center justify-center">
                    <LogOut className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                </button>
              </div>
            </details>
          )}
        </nav>
      </div>
    </header>
  );
}
