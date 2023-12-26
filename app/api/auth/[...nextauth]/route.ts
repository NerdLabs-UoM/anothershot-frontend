import NextAuth from "next-auth/next"
import { AuthOptions } from "next-auth";
import { Account, User as AuthUser } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

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
                console.log(credentials)
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
                    console.log("user = ", user)
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

        async session({ session, user, token }: { session: any, user: any, token: any }) {
            session.user.id = user.id
            session.user.email = user.email
            session.user.userRole = user.userRole
            return session
        },

        async jwt({ token, account, user }) {
            
            return {...token, ...user}
        }
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