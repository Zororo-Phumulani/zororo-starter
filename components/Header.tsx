"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Close details when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        detailsRef.current.removeAttribute("open");
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
  };

  return (
    <header className="h-[72px] border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 relative z-50">
      {/* Brand Identity matching Workspace */}
      <Link href="/" className="flex flex-col text-slate-900 no-underline whitespace-nowrap">
        <span className="font-poppins font-semibold text-[22px] leading-none">
          Zororo Phumulani
        </span>
        <span className="font-inter text-[12px] tracking-[0.05em] text-slate-500 mt-1.5 uppercase leading-none block">
          App Starter
        </span>
      </Link>
      
      {/* Top Bar Actions */}
      <nav aria-label="Your account" className="flex items-center gap-4 text-[13px]">
        {/* App Switcher Target Mount */}
        <div id="zp-app-switcher-mount" className="flex items-center justify-center w-11 h-11 order-1"></div>

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
              {/* Hide the default triangle */}
              <style jsx>{`summary::-webkit-details-marker { display: none; }`}</style>
              <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center font-semibold text-[14px] hover:bg-slate-200 transition-colors">
                {getInitials(session.user.name)}
              </div>
            </summary>
            
            {/* Dropdown Panel */}
            <div className="absolute right-0 top-[calc(100%+8px)] w-[260px] p-4 bg-white border border-slate-200 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <p className="font-semibold text-slate-900 text-[14px] m-0 truncate">
                {session.user.name}
              </p>
              <p className="text-[12px] text-slate-500 mt-1 mb-3 truncate">
                {session.user.email || 'Zororo Phumulani App Starter'}
              </p>
              
              <div className="h-px bg-slate-200 my-2 -mx-4"></div>
              
              <button 
                onClick={() => signOut()}
                className="w-full text-left px-3 py-2.5 rounded-md text-[14px] text-slate-700 hover:bg-slate-100 transition-colors"
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
