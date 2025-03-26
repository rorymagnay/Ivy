import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma, isDatabaseAvailable } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          // Check if database is available, if not use demo mode
          const dbAvailable = await isDatabaseAvailable().catch(() => false);
          
          if (!dbAvailable) {
            // Demo mode - accept any credentials
            console.log("Database unavailable, using demo mode for authentication");
            return {
              id: "demo-user-id",
              name: "Demo User",
              email: credentials.email,
              image: null,
            };
          }

          // Normal authentication flow with database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.password) {
            throw new Error("User not found");
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture as string | null;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST } 