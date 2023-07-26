import connect from '@/libs/db';
import User from '@/model/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		throw new Error('Wrong method');
	} else {
		await connect();
		try {
			const newUser = await req.json();
			const hashedPassword = await bcrypt.hash(newUser.password, 10);
			await new User({ ...newUser, password: hashedPassword }).save();
			return Response.json(`Welcome onboard, ${newUser.name}`, { status: 200 });
		} catch (e) {
			if (e.code === 11000) {
				return new NextResponse(`${Object.keys(e.keyValue)[0]} existed`, {
					status: 400,
				});
			} else {
				throw new Error(e);
			}
		}
	}
};

export { handler as GET, handler as POST };
