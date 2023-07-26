import connect from '@/libs/db';
import Post from '@/model/Post';

const handler = async (req, { params }) => {
	if (req.method === 'GET') {
		const { id } = params;
		await connect();
		try {
			const post = await Post.findById(id);
			return Response.json(post, { status: 200 });
		} catch (e) {
			throw new Error(e);
		}
	} else if (req.method === 'DELETE') {
		console.log('postId');
	} else {
		throw new Error('Wrong method');
	}
};

export { handler as GET, handler as POST, handler as DEL };
