import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connect from '@/libs/db';
import bcrypt from 'bcrypt';
import User from '@/model/User';
import { NextResponse } from 'next/server';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			async authorize(credentials) {
				if (!credentials.email || !credentials.password) {
					throw new Error('Invalid credentials');
				}
				await connect();

				const user = await User.findOne({ email: credentials.email });

				if (!user) throw new Error('User not found');

				const isPasswordCorrect = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!isPasswordCorrect) {
					throw new Error('Wrong password', { status: 300 });
				}

				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user?.id) {
				token.id = user.id;
			}
			if (user?.userName) {
				token.userName = user.userName;
			}
			return token;
		},
		async session({ session, token }) {
			session.id = token.id;
			session.userName = token.userName;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
