"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Receipt, 
  Users, 
  Wallet,
  Settings,
  Bell,
  LogOut,
  Moon,
  Sun,
  MoreVertical
} from "lucide-react";
import Script from "next/script";

export default function DataHeavyLayout() {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [dropupOpen, setDropupOpen] = useState(false);
  
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
        <div className={`h-[72px] flex items-center border-b border-slate-200 dark:border-slate-800 shrink-0 transition-all duration-300 ${
          collapsed ? "justify-center px-2" : "px-4 justify-between"
        }`}>
          <div className={`flex flex-col overflow-hidden ${collapsed ? "hidden" : "flex"}`}>
            <span className="font-semibold text-lg tracking-tight truncate text-slate-900 dark:text-white leading-tight">
              Data Analytics
            </span>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Zororo Phumulani
            </span>
          </div>
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg flex items-center justify-center ${
              collapsed ? "w-10 h-10" : "p-1.5"
            }`}
          >
            {collapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium group relative shadow-sm">
            <LayoutDashboard className="w-5 h-5 shrink-0 transition-transform duration-200 scale-110" />
            {!collapsed && <span className="truncate">Overview</span>}
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 group relative">
            <Receipt className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            {!collapsed && <span className="truncate">Collections</span>}
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 group relative">
            <Wallet className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            {!collapsed && <span className="truncate">Ledger</span>}
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 group relative">
            <Users className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            {!collapsed && <span className="truncate">Customers</span>}
          </Link>
        </div>

        {/* Drop-up Menu */}
        {dropupOpen && !collapsed && (
          <div className="absolute bottom-[76px] left-3 right-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
            <Link 
              href="#"
              onClick={() => setDropupOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Settings
            </Link>
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer" onClick={() => {
              const theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
              document.documentElement.classList.toggle("dark", theme === "dark");
              localStorage.setItem("zororo-theme", theme);
            }}>
              <span className="flex items-center gap-3"><Moon className="w-4 h-4 text-slate-400" /> Appearance</span>
            </div>
            <button 
              onClick={() => signOut()}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-slate-100 dark:border-slate-700 w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}

        {/* Sidebar Footer (Avatar) */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3 relative">
          <button 
            onClick={() => setDropupOpen(!dropupOpen)}
            className={`flex items-center gap-3 text-left w-full p-2 rounded-xl transition-all duration-200 ${dropupOpen ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"} ${collapsed ? "justify-center" : ""}`}
            title={collapsed ? "Account settings" : undefined}
          >
            <div className="w-9 h-9 shrink-0 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
              {getInitials(session?.user?.name)}
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {session?.user?.name || 'Developer'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {session?.user?.email || 'admin@zororo.co.za'}
                  </p>
                </div>
                <MoreVertical className="w-4 h-4 text-slate-400 shrink-0" />
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 overflow-hidden relative z-10">
        {/* Top bar for data-heavy view */}
        <header className="h-[72px] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 bg-white dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Analytics Dashboard
          </h2>
          <div className="flex items-center gap-4">
            {/* App Switcher properly mounted in the top bar */}
            <div id="zp-app-switcher-mount" className="w-10 h-10 flex items-center justify-center shrink-0" />
            <Script 
              src="https://identity.zororophumulani.co.za/switcher.js" 
              strategy="lazyOnload"
              data-token={identityToken} 
            />

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { label: 'Total Volume', value: 'R 4.2M', trend: '+12.5%' },
              { label: 'Active Policies', value: '12,450', trend: '+3.2%' },
              { label: 'Exceptions', value: '24', trend: '-5.1%' },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{stat.trend}</span>
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
