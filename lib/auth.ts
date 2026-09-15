import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/login", error: "/login" },
  providers: [
    ...(process.env.NEXT_PUBLIC_STARTER_MODE === "true" ? [
      CredentialsProvider({
        id: "starter-mock",
        name: "Mock Starter Mode",
        credentials: {},
        async authorize() {
          return {
            id: "dev-mock-123",
            name: "Jane Doe (Developer Preview)",
            email: "jane.doe@zororophumulani.co.za",
            role: "developer"
          };
        }
      })
    ] : []),
    {
      id: "zororo-identity",
      name: "Zororo Phumulani Identity",
      type: "oauth",
      issuer: process.env.ZORORO_ISSUER,
      clientId: process.env.ZORORO_CLIENT_ID,
      clientSecret: process.env.ZORORO_CLIENT_SECRET,
      client: { id_token_signed_response_alg: "HS256" },
      authorization: {
        url: `${process.env.ZORORO_ISSUER}/api/oauth/authorize`,
        params: { scope: "openid profile email" }
      },
      token: `${process.env.ZORORO_ISSUER}/api/oauth/token`,
      userinfo: `${process.env.ZORORO_ISSUER}/api/oauth/userinfo`,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          role: profile.role || 'user',
        };
      },
    },
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret",
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};
