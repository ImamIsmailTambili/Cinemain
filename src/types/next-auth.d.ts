import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
    interface User extends DefaultUser {
        username: string
        telepon: string
    }
    interface Session extends DefaultSession {
        user: User & {
            username: string
            telepon: string
        }
        token: {
            username: string
            telepon: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        username?: string;
        telepon?: string;
    }
}
