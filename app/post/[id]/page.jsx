'use client';

import FavPosts from '@/components/FavPosts';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SinglePost = ({ params }) => {
	const session = useSession();
	const [currentUser, setCurrentUser] = useState();
	const [currentPost, setCurrentPost] = useState();

	const currentPostId = params.id;

	const getCurrentPost = async (currentId) => {
		await axios
			.get(`/api/post/${currentId}`)
			.then((r) => setCurrentPost(r.data))
			.catch((e) => {
				throw new Error('Failed to fetch data');
			});
	};

	const fetchCurrentUser = async () => {
		session.status === 'authenticated' &&
			(await axios
				.get(`/api/user/${session.data.id}`)
				.then((r) => {
					setCurrentUser(r.data);
					// console.log(currentUser);
				})
				.catch((e) => console.log(e)));
	};

	useEffect(() => {
		getCurrentPost(currentPostId);
		fetchCurrentUser();
	}, []);

	if (session.status === 'loading') {
		return <div>Loading</div>;
	}
	return (
		<div className="flex justify-center z-50">
			<div className="container grid grid-cols-4 gap-4">
				<div
					className={`${
						currentUser ? 'col-span-3' : 'col-span-4'
					} pt-4 flex flex-col`}
				>
					<div className="relative border aspect-[3/2] md:aspect-[4/1]  rounded-lg overflow-hidden mb-5">
						<Image
							src={currentPost?.img || '/light-neutral.png'}
							priority
							fill
							style={{ objectFit: 'cover' }}
							alt=""
						/>
					</div>
					<h1 className="font-semibold text-3xl">{currentPost?.title}</h1>
					<p className="text-sm text-neutral-400 font-bold pb-3">
						{currentPost?.cat}
					</p>
					<div>{currentPost?.content}</div>
				</div>
				{currentUser && (
					<div className="pt-4">
						<FavPosts currentUser={currentUser} />
					</div>
				)}
			</div>
		</div>
	);
};

export default SinglePost;
