import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { loginUser } from "../user/loginHandler";
import { UserModel } from "@/models/User";
import bcrypt from "bcryptjs";
import { UserCredentials } from "@/utils/interfaces/userInterfaces";
import dbConnect from "@/lib/mongodb";

export type User = {
    id: string;
} & DefaultSession["user"];

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    name: token.name,
                }
            }
        },
        jwt: async ({ token, user }) => {
            if(user) {
                token.name = user.name;
            }
            return token;
        }
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    await dbConnect();

                    const userAuthenticated = await loginUser(credentials as UserCredentials);

                    if(!userAuthenticated) {
                        return null;
                    }

                    return userAuthenticated;
                    
                }

                catch(err) {
                    console.error(`Erro na autenticação: ${err}`);
                    return null;
                }
            }
        })
    ]
}