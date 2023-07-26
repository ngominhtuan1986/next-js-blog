'use client';

import authHook from '@/hooks/authHook';
import composeHook from '@/hooks/composeHook';
import menuHook from '@/hooks/menuHook';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const ProfileMenu = () => {
	const session = useSession();
	const useAuthHook = authHook();
	const useMenuHook = menuHook();
	const useComposeHook = composeHook();

	return (
		<div className={'flex flex-col gap-2 px-3 py-3 bg-white z-50 '}>
			{session?.status === 'unauthenticated' && (
				<>
					<Link
						onClick={() => useAuthHook.onOpen(false)}
						href="/"
						className="hover:bg-neutral-100 px-3 py-2 rounded-lg transition text-neutral-500 hover:text-neutral-900"
					>
						Login
					</Link>
					<Link
						onClick={() => useAuthHook.onOpen(true)}
						href="/"
						className="hover:bg-neutral-100 px-3 py-2 rounded-lg transition text-neutral-500 hover:text-neutral-900"
					>
						Sign Up
					</Link>
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
					<p
						onClick={() => {
							signOut();
							useComposeHook.onChangeTitle('Sample test');
							useComposeHook.onChangeContent('Sample content');
							useComposeHook.onImgUpload('');
						}}
						className="hover:bg-neutral-100 px-3 py-2 rounded-lg transition text-neutral-500 hover:text-neutral-900 cursor-pointer"
					>
						Logout
					</p>
				</>
			)}
		</div>
	);
};

export default ProfileMenu;
