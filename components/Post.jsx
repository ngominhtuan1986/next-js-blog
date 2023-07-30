'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdDelete, MdFavorite } from 'react-icons/md';

const Post = ({ isProfile, post }) => {
	const session = useSession();
	const router = useRouter();

	const handleFav = async (postId) => {};

	if (session.status === 'loading') {
		return 'Loading';
	}

	const handleDel = async (postId) => {};

	if (session.status === 'loading') {
		return 'Loading';
	}

	return (
		<div>
			{/* IMAGE */}
			<div
				className={`${
					isProfile ? 'aspect-[4/1]' : 'aspect-square'
				} relative cursor-pointer rounded-lg overflow-hidden transition`}
			>
				<div className="hidden">
					<MdFavorite
						onClick={() => handleFav(post._id)}
						size={20}
						className="absolute right-4 top-4 z-10 text-white opacity-80 hover:opacity-100 transition hover:scale-110 hover:text-orange-500"
					/>
					<MdDelete
						onClick={() => handleDel(post._id)}
						size={23}
						className="absolute right-4 bottom-4 z-10 text-white opacity-80 hover:opacity-100 transition hover:scale-110 hover:text-orange-500"
					/>
					<Image
						src={'/placeholder.jpg'}
						height={20}
						width={20}
						priority
						className="rounded-full absolute left-4 bottom-4 z-10 shadow-lg hover:scale-110 transition opacity-80 hover:opacity-100"
						alt=""
					/>
				</div>
				<Image
					onClick={() => router.push(`post/${post?._id}`)}
					src={post?.img || '/light-neutral.png'}
					alt=""
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					style={{ objectFit: 'cover' }}
					priority
					className=" hover:brightness-90 transition"
				/>
			</div>
			{/* CONTENT */}
			<div className="pt-3">
				<p className="font-bold line-clamp-1">{post?.title}</p>
				<p
					className={`${
						isProfile ? 'line-clamp-1' : 'line-clamp-2'
					} text-neutral-500`}
				>
					{post?.content}
				</p>
				<p className="font-base text-sm pt-1">{post?.cat}</p>
			</div>
		</div>
	);
};

export default Post;
