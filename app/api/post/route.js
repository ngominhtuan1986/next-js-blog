import connect from '@/libs/db';
import Post from '@/model/Post';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		await connect();
		try {
			const posts = await Post.find();
			return Response.json(posts, { status: 200 });
		} catch (e) {
			throw new Error(e);
		}
	} else if (req.method === 'POST') {
		await connect();
		try {
			const newPost = await req.json();
			await new Post(newPost).save();
			return Response.json('Post upload successfully', { status: 200 });
		} catch (e) {
			throw new Error(e);
		}
	} else {
		throw new Error('Wrong method');
	}
};

export { handler as GET, handler as POST };
