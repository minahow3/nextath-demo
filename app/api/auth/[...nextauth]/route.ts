import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { prompt: "consent", access_type: "offline", response_type: "code" }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? ""; // `??` で undefined を防ぐ
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect URL:", url, "Base URL:", baseUrl)
      return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
