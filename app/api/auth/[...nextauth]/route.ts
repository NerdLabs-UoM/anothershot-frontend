import NextAuth from "next-auth/next"
import { AuthOptions } from "next-auth";
import { Account, User as AuthUser } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {

    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            type: 'credentials',
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any, req) {
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        }
                    });
                    if (!user) {
                        throw new Error("Email is not registered");
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password as string
                    )

                    if (!isValid) {
                        throw new Error("Invalid password");
                    }
                    return user;
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile: any) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: AuthUser | AdapterUser, account: Account | null }) {
            if (account?.provider === "credentials") {
                return true;
            }
            if (account?.provider === "google") {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: {
                            email: user?.email as string,
                        }
                    });
                    if (!existingUser) {
                        throw new Error("Email is not registered");
                    }
                    return true;
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }
            return true;
        },
    },

    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }