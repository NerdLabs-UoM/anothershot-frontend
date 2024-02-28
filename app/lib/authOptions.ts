import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {

                if (credentials) {
                    const { email, password } = credentials;
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                        email,
                        password,
                    });

                    if (res.status === 401) {
                        throw new Error("Invalid credentials");
                    }

                    const user = await res.data;
                    return user;
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
        async jwt({ token, user }) {
            if (user) {
                return { ...token, ...user };
            }
            return token;
        },

        async session({ token, session, user }) {
            if (token) {
                session.user = token.user
                session.backendTokens = token.backendTokens;
            }
            return session;
        }
    },
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30
    },
}