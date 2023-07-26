'use client';

import { RxAvatar } from 'react-icons/rx';
import { AiOutlineMenu } from 'react-icons/ai';
import { useSession } from 'next-auth/react';

const ProfileWidget = ({ onClick }) => {
	const session = useSession();
	return (
		<button
			onClick={onClick}
			className=" flex justify-center items-center gap-[8px] border rounded-full p-1 pl-3 hover:shadow-md transition"
		>
			<AiOutlineMenu className="text-lg" />
			{session?.data?.user && <span>{session.data.user.name}</span>}
			<RxAvatar size={30} />
		</button>
	);
};

export default ProfileWidget;
