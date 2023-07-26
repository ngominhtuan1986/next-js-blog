import connect from '@/libs/db';
import User from '@/model/User';

const handler = async (req, { params }) => {
	if (req.method === 'GET') {
		const { id } = params;
		await connect();
		try {
			const user = await User.findById(id).select('-password');
			return Response.json(user, { status: 200 });
		} catch (e) {
			throw new Error('User does not exist');
		}
	} else if (req.method === 'PUT') {
		return Response.json('sudkfjdkjfkdjf', { status: 200 });
	} else {
		throw new Error('Wrong method');
	}
};

export { handler as GET, handler as POST, handler as PUT };
