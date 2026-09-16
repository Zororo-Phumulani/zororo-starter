"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Activity, 
  BarChart3, 
  Database,
  Settings,
  Bell,
  LogOut,
  Moon,
  Sun,
  ChevronsUpDown,
  Search,
  LineChart
} from "lucide-react";
import Script from "next/script";

export default function DataHeavyLayout() {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [dropupOpen, setDropupOpen] = useState(false);

  // Mount switcher safely on client-side navigations
  useEffect(() => {
    // Clear the lock so the IIFE runs again
    delete (window as any).__zpSwitcherLoaded;
    
    // Remove old instances if any exist to prevent duplicates
    document.querySelectorAll('.__zp-sw, .__zp-sw-overlay').forEach(el => el.remove());

    const script = document.createElement('script');
    script.src = "https://identity.zororophumulani.co.za/switcher.js";
    script.setAttribute('data-token', identityToken);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up when leaving page
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [identityToken]);
  
  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
  };

  const identityToken = (session as any)?.identityAccessToken || (session as any)?.accessToken || "";

  return (
    <div className="flex w-full h-[100dvh] bg-slate-50 dark:bg-slate-950 overflow-hidden absolute top-0 left-0 right-0 bottom-0 z-50">
      
      {/* Sidebar - Matching agents-collections-admin */}
      <aside
        className={`flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          collapsed ? "w-[80px]" : "w-[260px]"
        } relative z-20`}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center shrink-0 transition-all duration-300 border-b border-slate-200 dark:border-slate-800 ${
          collapsed ? "h-16 justify-center" : "h-16 px-4 justify-between"
        }`}>
          <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? "justify-center w-full" : "flex"}`}>
            <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-sm">
              <LineChart className="w-6 h-6 text-[#123c5a] dark:text-slate-300" />
            </div>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold text-lg tracking-tight truncate text-slate-900 dark:text-white leading-tight mb-0.5">
                  Data Analytics
                </span>
                <span className="text-[13px] text-slate-500 truncate leading-none">
                  Zororo Phumulani
                </span>
              </div>
            )}
          </div>
          
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-xl w-9 h-9 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {collapsed && (
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setCollapsed(false)}
                className="text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-xl w-11 h-11 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <Link href="#" className={`flex items-center transition-all duration-200 rounded-xl group relative shadow-sm font-medium bg-[#123c5a] dark:bg-white text-white dark:text-slate-900 ${
            collapsed ? "w-11 h-11 justify-center mx-auto p-0" : "gap-3 px-3 py-2.5 w-full"
          }`}>
            <LayoutDashboard className="w-5 h-5 shrink-0 transition-transform duration-200 scale-110" />
            {!collapsed && <span className="truncate">Overview</span>}
          </Link>
          <Link href="#" className={`flex items-center transition-all duration-200 rounded-xl group relative font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 ${
            collapsed ? "w-11 h-11 justify-center mx-auto p-0" : "gap-3 px-3 py-2.5 w-full"
          }`}>
            <Activity className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            {!collapsed && <span className="truncate">Transactions</span>}
          </Link>
          <Link href="#" className={`flex items-center transition-all duration-200 rounded-xl group relative font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 ${
            collapsed ? "w-11 h-11 justify-center mx-auto p-0" : "gap-3 px-3 py-2.5 w-full"
          }`}>
            <BarChart3 className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            {!collapsed && <span className="truncate">Reports</span>}
          </Link>
          <Link href="#" className={`flex items-center transition-all duration-200 rounded-xl group relative font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 ${
            collapsed ? "w-11 h-11 justify-center mx-auto p-0" : "gap-3 px-3 py-2.5 w-full"
          }`}>
            <Database className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            {!collapsed && <span className="truncate">Sources</span>}
          </Link>
        </div>

        {/* Footer Actions / Drop-up */}
        <div className="relative p-3 border-t border-slate-200 dark:border-slate-800 shrink-0 flex flex-col gap-2">
  
          {dropupOpen && !collapsed && (
            <div className="absolute bottom-[80px] left-3 right-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl shadow-slate-900/10 overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
              <Link 
                href="/settings"
                onClick={() => setDropupOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                Settings
              </Link>
              
              <div className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border-t border-slate-100 dark:border-slate-700" onClick={() => {
                const theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
                document.documentElement.classList.toggle("dark", theme === "dark");
                localStorage.setItem("zororo-theme", theme);
              }}>
                <span className="flex items-center gap-3"><Moon className="w-4 h-4 text-slate-400" /> Appearance</span>
              </div>
              
              <button 
                onClick={() => {
                  signOut();
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-slate-100 dark:border-slate-700 w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          )}
  
          <button
            onClick={() => {
              if (collapsed) {
                setDropupOpen(!dropupOpen);
              } else {
                setDropupOpen(!dropupOpen);
              }
            }}
            className={`flex items-center transition-all duration-200 text-left ${
              dropupOpen ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
            } ${collapsed ? "w-11 h-11 justify-center mx-auto p-0 rounded-full" : "w-full p-2 gap-3 rounded-xl"}`}
            title={collapsed ? "Account menu" : "Settings"}
          >
            {collapsed ? (
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200 dark:border-slate-700">
                {getInitials(session?.user?.name)}
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200 dark:border-slate-700">
                  {getInitials(session?.user?.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium text-slate-900 dark:text-white truncate">
                    {session?.user?.name || 'Guest User'}
                  </p>
                  <p className="text-[12px] text-slate-500 truncate mt-0.5">
                    {session?.user?.email || 'user@zororophumulani.co.za'}
                  </p>
                </div>
                <ChevronsUpDown className="w-4 h-4 text-slate-400 shrink-0" />
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 overflow-hidden relative z-10">
        {/* Top bar for data-heavy view */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white text-[14px]">
            <span className="text-slate-500">Data Analytics</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="font-medium">Overview</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 w-[280px] shadow-sm">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-slate-400 min-w-0" />
              <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 font-mono text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 rounded">
                <span className="text-[12px]">⌘</span> / Ctrl K
              </kbd>
            </div>

            {/* App Switcher properly mounted in the top bar */}
            <div id="zp-app-switcher-mount" className="w-10 h-10 flex items-center justify-center shrink-0" />

            <button className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <Link 
              href="/" 
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-2"
            >
              Exit preview
            </Link>
          </div>
        </header>

        {/* Mock Data Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { label: 'Total Volume', value: 'R 4.2M', trend: '+12.5%' },
              { label: 'Active Policies', value: '12,450', trend: '+3.2%' },
              { label: 'Exceptions', value: '24', trend: '-5.1%' },
              { label: 'Success Rate', value: '99.8%', trend: '+0.1%' },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                  <span className={`text-sm font-semibold ${stat.trend.startsWith('-') ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="font-semibold text-slate-900 dark:text-white">Recent Transactions</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-medium border-b border-slate-200 dark:border-slate-800">ID</th>
                  <th className="px-6 py-3 font-medium border-b border-slate-200 dark:border-slate-800">Customer</th>
                  <th className="px-6 py-3 font-medium border-b border-slate-200 dark:border-slate-800">Date</th>
                  <th className="px-6 py-3 font-medium border-b border-slate-200 dark:border-slate-800">Amount</th>
                  <th className="px-6 py-3 font-medium border-b border-slate-200 dark:border-slate-800">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { id: 1, name: "Thabo Mbeki", amount: "R 1,250.00", status: "Cleared" },
                  { id: 2, name: "Sarah Jenkins", amount: "R 450.00", status: "Pending" },
                  { id: 3, name: "Michael Ndlovu", amount: "R 3,100.00", status: "Cleared" },
                  { id: 4, name: "Lerato Khumalo", amount: "R 850.00", status: "Failed" },
                  { id: 5, name: "David Smith", amount: "R 2,400.00", status: "Cleared" },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">TRX-{Math.floor(Math.random() * 10000)}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.name}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Sep 16, 2026</td>
                    <td className="px-6 py-4 font-mono text-slate-900 dark:text-white">{row.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        row.status === 'Cleared' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400' :
                        row.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400' :
                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
