"use client";

import { useSession, signIn } from "next-auth/react";
import { ArrowRight, BookOpen, Key, CheckCircle2, AlertCircle } from "lucide-react";

export default function StarterPage() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    // In STARTER_MODE, bypass real OAuth for developer previews
    const provider = process.env.NEXT_PUBLIC_STARTER_MODE === "true" ? "starter-mock" : "zororo-identity";
    signIn(provider);
  };

  if (status === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-slate-500 font-medium">Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12">
      {!session ? (
        // Unauthenticated State - ZDES Compliant Focal Area
        <div className="flex flex-col md:flex-row gap-12 items-start mt-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-[40px] leading-[1.1] font-bold text-slate-900 tracking-tight">
              Connect your application
            </h1>
            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
              Integrate directly with the Zororo Phumulani digital ecosystem. Provide your users with unified access, central security, and a seamless workspace experience.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button
                onClick={handleSignIn}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-[#fbfbf9] transition-colors"
              >
                Sign in to connect
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors">
                <BookOpen className="w-4 h-4" />
                Read documentation
              </a>
            </div>

            {process.env.NEXT_PUBLIC_STARTER_MODE === "true" && (
              <div className="mt-8 flex items-start gap-3 p-4 bg-emerald-50 rounded text-emerald-800 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-sm">Starter mode is active</p>
                  <p className="text-sm mt-1 text-emerald-700/90">
                    Authentication is currently simulated. You can test the sign-in experience without configuring a live client secret.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-[400px] shrink-0 bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
              <Key className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Standard OAuth 2.0
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              This provider implements a confidential-client authorization code flow. Your application owns its pages and local session, while Zororo Phumulani Identity manages security.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2" />
                Secure server-side token exchange
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2" />
                Automatic session synchronization
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2" />
                Centralized role management
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // Authenticated State - ZDES Compliant Workspace
        <div className="space-y-8 animate-in fade-in duration-500">
          <header className="flex flex-col gap-2 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Workspace overview
              </h1>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                Active
              </span>
            </div>
            <p className="text-slate-600">
              Welcome back, {session.user?.name}. Your application is securely connected.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">
                  Current session data
                </h2>
              </div>
              <div className="p-0 bg-slate-50 border-t border-slate-200">
                <pre className="p-6 text-sm text-slate-800 font-mono whitespace-pre-wrap break-all overflow-auto max-h-[400px]">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Required next steps</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Database setup</h4>
                      <p className="text-sm text-slate-600 mt-1">Configure your Prisma schema for production.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Business logic</h4>
                      <p className="text-sm text-slate-600 mt-1">Build your specific application workflows.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#fbfbf9] p-5 rounded-lg border border-slate-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">
                  Ensure you update your <code className="bg-slate-200 px-1 py-0.5 rounded text-xs text-slate-800">NEXTAUTH_URL</code> before deploying to Railway.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
