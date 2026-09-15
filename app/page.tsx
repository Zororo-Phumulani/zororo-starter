"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Welcome to Zororo Integration Starter</h1>
      
      <p className="text-gray-600 mb-8">
        This is a minimal application demonstrating how to authenticate with Zororo Phumulani Identity and mount global ecosystem widgets.
      </p>

      {status === "loading" ? (
        <div>Loading session...</div>
      ) : session ? (
        <div className="bg-green-50 text-green-800 p-4 rounded-md">
          <p className="font-semibold mb-2">Authenticated successfully!</p>
          <pre className="text-xs bg-green-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(session.user, null, 2)}
          </pre>
          <button
            onClick={() => signOut()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="mb-4">You are not authenticated.</p>
          <button
            onClick={() => signIn("zororo-identity")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign in with Zororo Identity
          </button>
        </div>
      )}
    </div>
  );
}
