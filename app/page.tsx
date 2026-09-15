"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { ShieldCheck, LogOut, ArrowRight, Activity } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-white border border-zinc-200 rounded-xl shadow-sm text-zinc-950">
      
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-zinc-950 text-white rounded-lg flex items-center justify-center">
          <Activity className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Zororo Integration Starter</h1>
          <p className="text-sm text-zinc-500">Connecting to the Phumulani Ecosystem</p>
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-6">
        {status === "loading" ? (
          <div className="flex items-center gap-2 text-zinc-500 animate-pulse">
            <div className="h-4 w-4 rounded-full bg-zinc-200" />
            Loading secure session...
          </div>
        ) : session ? (
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-5 rounded-lg flex items-start gap-4">
              <ShieldCheck className="size-6 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-950 mb-1">Authenticated via Zororo Identity</p>
                <p className="text-sm text-emerald-800 mb-3">Your ecosystem SSO token was validated successfully.</p>
                <pre className="text-xs bg-emerald-100/50 p-3 rounded border border-emerald-200/50 overflow-x-auto">
                  {JSON.stringify(session.user, null, 2)}
                </pre>
              </div>
            </div>
            
            <button
              onClick={() => signOut()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-medium rounded-md transition-colors"
            >
              <LogOut className="size-4" />
              Sign out of Workspace
            </button>
          </div>
        ) : (
          <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-200 text-center space-y-4">
            <h2 className="font-medium text-lg">Central Authentication Required</h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto">
              You must sign in with Zororo Phumulani Identity to access this application and your workspace ecosystem.
            </p>
            <button
              onClick={() => signIn("zororo-identity")}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
            >
              Continue to Sign In
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

