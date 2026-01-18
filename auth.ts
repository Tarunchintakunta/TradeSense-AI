import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
            // For Hackathon/Demo: Accept ANY email/password if valid string
            // In a real app, verify against DB.
            const { email } = parsedCredentials.data;
            return {
                id: 'demo-user-id',
                email: email,
                name: 'Demo Trader',
            };
        }
        return null;
      },
    }),
  ],
});
