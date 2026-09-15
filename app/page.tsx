"use client";

import { useSession, signIn } from "next-auth/react";
import { ArrowRight, Sparkles, LayoutGrid, ShieldCheck, Zap } from "lucide-react";

export default function StarterPage() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    // In STARTER_MODE, we bypass the real OAuth flow to let developers preview the app instantly.
    const provider = process.env.NEXT_PUBLIC_STARTER_MODE === "true" ? "starter-mock" : "zororo-identity";
    signIn(provider);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 font-medium">Connecting to Ecosystem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 text-white p-2 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-zinc-900 tracking-tight">Zororo App Starter</span>
            </div>
            {session && (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-zinc-900">{session.user?.name}</span>
                  <span className="text-xs text-emerald-600 font-medium">Verified Access</span>
                </div>
                <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold border border-emerald-200">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!session ? (
          // Unauthenticated State (Inspiring Hero)
          <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-200 overflow-hidden">
              <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 px-10 py-16 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-6 ring-1 ring-white/20">
                  <ShieldCheck className="w-8 h-8 text-emerald-100" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                  Welcome to the Ecosystem
                </h1>
                <p className="text-lg text-emerald-100/90 max-w-xl mx-auto mb-10 leading-relaxed">
                  Join the Zororo Phumulani digital platform. Secure, unified, and built to inspire. Connect your application to the central identity network today.
                </p>
                <button
                  onClick={handleSignIn}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-emerald-900 bg-white rounded-full shadow-lg transition-all hover:bg-zinc-50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
                >
                  <span className="text-lg">Authenticate to Continue</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-zinc-200">
                <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-200 bg-zinc-50/50">
                  <LayoutGrid className="w-6 h-6 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">Unified Workspace</h3>
                  <p className="text-sm text-zinc-600">Access this app seamlessly alongside your other assigned Zororo tools through the global App Switcher.</p>
                </div>
                <div className="p-8 bg-zinc-50/50">
                  <Zap className="w-6 h-6 text-amber-500 mb-4" />
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">Fast Integration</h3>
                  <p className="text-sm text-zinc-600">Built on NextAuth.js. Drop in your Client ID and you are instantly connected to the central directory.</p>
                </div>
              </div>
            </div>
            {process.env.NEXT_PUBLIC_STARTER_MODE === "true" && (
              <p className="text-center text-sm font-medium text-emerald-600 mt-6 bg-emerald-50 py-2 px-4 rounded-full inline-block mx-auto">
                ✨ Starter Mode Enabled: Authentication is currently simulated for local development.
              </p>
            )}
          </div>
        ) : (
          // Authenticated State (Dashboard)
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
              <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
                Good to see you, {session.user?.name?.split(" ")[0]}!
              </h1>
              <p className="text-lg text-zinc-600 mt-2">
                Your application is successfully authenticated and ready to build.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
                <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Session Data
                </h2>
                <div className="bg-zinc-900 rounded-xl p-6 overflow-hidden">
                  <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap break-all">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <h3 className="text-emerald-900 font-bold mb-2">Next Steps</h3>
                  <ul className="space-y-3 text-sm text-emerald-800">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      Configure your database connection
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      Build your business logic components
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      Deploy to the Railway environment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
