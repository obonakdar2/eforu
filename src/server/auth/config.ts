import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const FAKE_USERS = [
  {
    id: "1",
    username: "admin",
    password: "password",
    name: "مدیر سیستم",
    email: "admin@example.com",
  },
  {
    id: "2",
    username: "user",
    password: "123456",
    name: "کاربر عادی",
    email: "user@example.com",
  },
  {
    id: "3",
    username: "احمد",
    password: "123456",
    name: "احمد محمدی",
    email: "ahmad@example.com",
  },
  {
    id: "4",
    username: "فاطمه",
    password: "password",
    name: "فاطمه احمدی",
    email: "fateme@example.com",
  },
];

/**
 * Options for NextAuth.js.
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "نام کاربری", type: "text" },
        password: { label: "رمز عبور", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Find user in fake database
        const user = FAKE_USERS.find(
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password,
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        token.username = (user as any).username;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        username: token.username as string,
      },
    }),
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
