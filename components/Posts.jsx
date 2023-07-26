'use client';

import Post from '@/components/Post';
import composeHook from '@/hooks/composeHook';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const Posts = () => {
	const [posts, setPosts] = useState();

	const getPosts = async () => {
		await axios
			.get('api/post')
			.then((r) => {
				setPosts(r.data);
			})
			.catch((e) => {
				throw new Error('Failed to fetch data');
			});
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="flex justify-center">
			<div className="container grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 gap-5 gap-y-10 pt-5">
				{posts?.map((post) => (
					<Post post={post} key={post._id} />
				))}
			</div>
		</div>
	);
};

export default Posts;
