import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      backendId?: number
    } & DefaultSession["user"]
  }

  interface User {
    backendId?: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendId?: number
  }
}
