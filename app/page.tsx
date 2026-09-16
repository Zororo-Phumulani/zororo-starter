"use client";

import { useSession, signIn } from "next-auth/react";
import { AppWindow, LayoutGrid, Users, Heart } from "lucide-react";
import Link from "next/link";

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
    <div className="w-full">
      {!session ? (
        // Unauthenticated State - Exactly mirroring the Workspace Welcome Layout
        <div className="max-w-[1248px] mx-auto px-[24px] py-[60px]">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-[56px] items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-5">
                ZORORO PHUMULANI APP STARTER
              </p>
              <h1 className="text-[clamp(36px,4.3vw,56px)] leading-[1.12] font-semibold text-slate-900 mt-[20px] mb-[24px] max-w-[550px] font-inter">
                Together, we make every day count.
              </h1>
              <p className="text-[17px] leading-[1.8] text-slate-600 max-w-[520px]">
                Welcome to your Zororo Phumulani application starter. A clean, connected template that seamlessly integrates with Identity and the global Workspace.
              </p>
              <button
                onClick={handleSignIn}
                className="inline-flex items-center gap-[36px] px-[20px] py-[14px] mt-[20px] bg-[#123c5a] text-white text-[14px] rounded-lg hover:bg-slate-800 transition-colors w-full md:w-auto justify-between"
              >
                Continue with Zororo Phumulani Identity
                <span aria-hidden="true" className="text-xl leading-none">'</span>
              </button>
            </div>
            
            <figure className="m-0 overflow-hidden rounded-2xl h-[240px] md:h-[440px] bg-slate-200 border border-slate-300 flex items-center justify-center order-first md:order-last">
              {/* Fallback pattern mimicking the welcome-care photo area */}
              <div className="text-center text-slate-500 flex flex-col items-center">
                <AppWindow className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-medium">Welcome Graphic Placeholder</p>
              </div>
            </figure>
          </section>

          <section className="mt-14 py-9 border-t border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
              <p className="text-[11px] font-poppins font-bold uppercase tracking-wider text-slate-500 md:mt-1.5">
                DEVELOPER EXPERIENCE
              </p>
              <h2 className="text-[24px] md:text-[25px] leading-[1.3] tracking-[-0.025em] font-bold text-slate-900 max-w-[550px] m-0">
                Connected to our network.<br />Closer to the people we serve.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="pr-0 md:pr-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 mb-3.5">
                  <LayoutGrid className="w-[22px] h-[22px] text-slate-700" />
                </span>
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2">Start in one familiar place</h3>
                <p className="text-[14px] leading-[1.7] text-slate-600 m-0">
                  Built to snap instantly into the global App Switcher and central Workspace environment.
                </p>
              </div>
              <div className="pr-0 md:pr-6 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-7">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 mb-3.5">
                  <Users className="w-[22px] h-[22px] text-slate-700" />
                </span>
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2">Unified Authentication</h3>
                <p className="text-[14px] leading-[1.7] text-slate-600 m-0">
                  Standard OAuth 2.0 flow ensures strict security while delivering a single-sign-on experience.
                </p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-7">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 mb-3.5">
                  <Heart className="w-[22px] h-[22px] text-slate-700" />
                </span>
                <h3 className="text-[16px] font-semibold text-slate-900 mb-2">Keep people at the heart</h3>
                <p className="text-[14px] leading-[1.7] text-slate-600 m-0">
                  Behind every task is a person. Your integrations help us care for the families who count on us.
                </p>
              </div>
            </div>
          </section>

          <footer className="mt-2 md:mt-8 border-t border-slate-200 pt-8 pb-12">
            <span className="text-sm font-medium text-slate-500">With you. For your family.</span>
          </footer>
        </div>
      ) : (
        // Authenticated State - Workspace List View Match
        <div className="max-w-[1248px] mx-auto px-[24px] py-[60px]">
          <section className="grid grid-cols-1 mb-8 pb-8 border-b border-slate-200">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-2">
                ZORORO PHUMULANI APP STARTER
              </p>
              <h1 className="text-[clamp(36px,4vw,54px)] leading-[1.13] font-semibold text-slate-900 font-inter mt-[18px] mb-[20px]">
                Welcome, {session.user?.name?.trim().split(/\s+/)[0] || 'there'}.
              </h1>
              <p className="text-slate-600 text-[16px] max-w-[580px]">
                Your application is connected and you are securely signed in.
              </p>
            </div>
          </section>

          <section aria-labelledby="apps-heading">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 id="apps-heading" className="flex items-center gap-[10px] text-[21px] font-semibold text-slate-900 m-0">
                  Session Identity
                  <span className="inline-flex items-center justify-center h-7 px-2.5 bg-emerald-100 text-emerald-800 text-[13px] font-medium rounded-lg">
                    Active
                  </span>
                </h2>
                <p className="text-[14px] text-slate-500 mt-[5px] mb-0">
                  Live data from the Zororo Phumulani token.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <AppWindow className="w-6 h-6" />
                  </div>
                  {process.env.NEXT_PUBLIC_STARTER_MODE === "true" && (
                    <span className="inline-flex px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                      Developer Preview
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-slate-900 m-0 mb-1">
                  OAuth Token Payload
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  {session.user?.role === 'ADMIN' ? 'Administrator access' : 'Assigned application role'}
                </p>
                <div className="mt-auto bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-auto max-h-[300px]">
                  <pre className="text-xs text-slate-700 font-mono">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </div>
              </article>

              <article className="p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-200/50 flex items-center justify-center text-slate-700">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 m-0 mb-1">
                  Data Analytics Layout
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  See how the application adapts for administrative interfaces and data-heavy dashboards, featuring the collapsible Collections Agent sidebar with bottom avatar placement.
                </p>
                <div>
                  <Link 
                    href="/data-heavy"
                    className="inline-flex items-center gap-3 w-full justify-center px-4 py-2.5 bg-[#0c1e33] text-white hover:bg-slate-800 font-medium rounded-md transition-colors"
                  >
                    Preview sidebar layout
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
