import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import { db } from "@/lib/db"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

// Add explicit type definitions for JWT and Session
import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        // Fix type error by using type assertion for token properties
        session.user.id = token.id as string
        session.user.name = token.name as string | null
        session.user.email = token.email as string | null
      }
      return session
    },
    async jwt({ token, user }) {
      // Only query the database if we have an email to search with
      if (token.email) {
        const dbUser = await db.user.findFirst({
          where: {
            email: token.email,
          },
        })

        if (dbUser) {
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
          }
        }
      }
      
      // If no database user found or no email to search with
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
} 