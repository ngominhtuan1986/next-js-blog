import { useSession } from 'next-auth/react';
import Post from './Post';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserPosts = () => {
	const [posts, setPosts] = useState();

	const getPosts = async () => {
		await axios
			.get('api/post')
			.then((r) => setPosts(r.data))
			.catch((e) => {
				throw new Error('Failed to fetch data');
			});
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 pt-0">
			{posts?.map((post) => (
				<Post post={post} key={post._id} />
			))}
		</div>
	);
};

export default UserPosts;
