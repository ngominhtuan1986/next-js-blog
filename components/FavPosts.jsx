import { useSession } from 'next-auth/react';
import Post from './Post';

const FavPosts = ({ currentUser }) => {

	if (!currentUser || currentUser.favPosts.length === 0) {
		return "You don't have favourite posts yet";
	}

	return (
		<div className="pt-0 flex flex-col gap-4">
			{currentUser.favPosts.map((post) => (
				<Post isProfile post={post} key={post._id} />
			))}
		</div>
	);
};

export default FavPosts;
