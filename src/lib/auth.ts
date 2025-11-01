import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                telepon: { label: "telepon", type: "text", placeholder: "Nomor Telepon" },
                pin: { label: "pin", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.telepon || !credentials.pin) {
                    return null;
                }

                const existingUser = await prisma.user.findUnique({
                    where: { telepon: credentials?.telepon }
                })
                if (!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(credentials.pin, existingUser.pin);
                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.nama,
                    telepon: existingUser.telepon
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.telepon = user.telepon;
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    telepon: token.telepon
                }
            }
        },
    }
}