import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

const refreshToken = async (token: JWT) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
            headers: {
                Authorization: `Bearer ${token.backendTokens.refreshToken}`,
            }
        });
        return {
            ...token,
            backendTokens: res.data,
        }
    } catch (error) {
        return {
            ...token,
            backendTokens: null,
        }
    }
}

const fetchToken = async (userId: string, email: string) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/${userId}`, {
            email,
        });
        return res.data;
    } catch (error) {
        return null
    }
}

const fetchUserByEmail = async (email: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/email/${email}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.SECRET,
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
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        }),
    ],
    pages: {
        signOut: "/auth/signout",
        error: "/error",
        verifyRequest: "/auth/verify-request",
        newUser: "/auth/new-user",
    },
    callbacks: {
        async signIn({ user, account, profile, credentials }) {
            let fetchedUser;
            if (account?.provider === "credentials") {
                if (!user || (user as any).user.emailVerified === false) {
                    throw new Error("Email not verified");
                }
            }
            if (account?.provider === "google") {
                fetchedUser = await fetchUserByEmail((user as any).email);
                if (!fetchedUser) {
                    throw new Error("User not found");
                }
                if (fetchedUser.emailVerified === false) {
                    throw new Error("Email not verified");
                }
                if (fetchedUser.accounts.length >= 0) {
                    const accountExists = fetchedUser.accounts.find((acc: any) => acc.provider === account.provider);
                    if (!accountExists) {
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/account/${fetchedUser.id}`, account);
                    }
                    return true;
                }
                return false;
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                return { ...token, ...user };
            }

            if (token.sub !== null) {
                if (token.email) {
                    const user = await fetchUserByEmail(token.email);
                    const tokens = await fetchToken(user.id, token.email);
                    token.user = user;
                    token.backendTokens = tokens;
                }
                return token;
            }

            if (token.backendTokens.expiresIn !== null) {
                if (new Date().getTime() < (token.backendTokens.expiresIn as number)) {
                    return token;
                }
            }
            return await refreshToken(token);
        },

        async session({ token, session, user }) {
            if (token) {
                session.user = token.user
                session.backendTokens = token.backendTokens;
            }
            return await session;
        }
    },
    session: {
        strategy: "jwt",
    },
    jwt: {
        maxAge: 24 * 60 * 60,
    },
}
