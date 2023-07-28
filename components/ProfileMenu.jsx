'use client';

import { signOut, useSession } from 'next-auth/react';
import authHook from '@/hooks/authHook';
import composeHook from '@/hooks/composeHook';
import Link from 'next/link';

const ProfileMenu = () => {
	const session = useSession();
	const useAuthHook = authHook();
	const useComposeHook = composeHook();

	return (
		<div className={'flex flex-col gap-2 px-3 py-3 bg-white z-50 '}>
			{session?.status === 'unauthenticated' && (
				<>
					<div
						onClick={() => useAuthHook.onOpen(false)}
						className="hover:bg-neutral-100 px-3 py-2 rounded-lg transition text-neutral-500 hover:text-neutral-900"
					>
						Login
					</div>
					<div
						onClick={() => useAuthHook.onOpen(true)}
						className="hover:bg-neutral-100 px-3 py-2 rounded-lg transition text-neutral-500 hover:text-neutral-900"
					>
						Sign Up
					</div>
				</>
			)}

			{session?.status === 'authenticated' && (
				<>
					<Link
						href="/dashboard"
						className="hover:bg-neutral-100 px-3 py-2 rounded-lg transition text-neutral-500 hover:text-neutral-900"
					>
						Dashboard
					</Link>
					<div
						onClick={() => {
							signOut();
							useComposeHook.onChangeTitle('Sample test');
							useComposeHook.onChangeContent('Sample content');
							useComposeHook.onImgUpload('');
						}}
						className="hover:bg-neutral-100 px-3 py-2 rounded-lg transition text-neutral-500 hover:text-neutral-900 cursor-pointer"
					>
						Logout
					</div>
				</>
			)}
		</div>
	);
};

export default ProfileMenu;
