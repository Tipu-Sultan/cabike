import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import { CabikeUsers } from '@/models/cabike-schemas';
import connectDB from '@/lib/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await CabikeUsers.findOne({ email: credentials.email });
        if (!user) throw new Error('No user found with this email');
        if (!user.isVerified) throw new Error('Please verify your email first');

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!user.isVerified) throw new Error('Please verify your email first');
        if (!isValid) throw new Error('Invalid password');

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          username: user.username, // Include username in the user object
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username; // Add username to the JWT token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username; // Add username to the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
};