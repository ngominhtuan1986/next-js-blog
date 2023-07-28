'use client';

import Link from 'next/link';
import { SiFacebookgaming } from 'react-icons/si';
import ProfileWidget from './ProfileWidget';
import ProfileMenu from './ProfileMenu';
import SearchWidget from './SearchWidget';
import menuHook from '@/hooks/menuHook';

const NavBar = () => {
	const useMenuHook = menuHook();
	return (
		<div className="h-20 border-b-[1px] border-neutral-200 flex justify-center items-center sticky top-0 z-40 bg-white">
			<div className="container flex justify-between items-center relative">
				{/* LEFT */}
				<Link
					href="/"
					className="flex justify-center items-center text-neutral-600 gap-2"
				>
					<SiFacebookgaming
						size={39}
						className="text-orange-600 rounded-full"
					/>
					<span className="font-extrabold text-lg hidden sm:block text-orange-600">
						Sun.Blog
					</span>
				</Link>
				{/* RIGHT */}
				<div className="flex justify-end items-center">
					<SearchWidget />
					<ProfileWidget
						onClick={useMenuHook.onToggle}
						className="flex items-center justify-center gap-4"
					/>
				</div>
				<div
					onClick={useMenuHook.onToggle}
					className={
						useMenuHook.isMenuOpen === false
							? 'hidden'
							: 'absolute border right-4 top-[105%] shadow-lg rounded-md overflow-hidden'
					}
				>
					<ProfileMenu />
				</div>
			</div>
		</div>
	);
};

export default NavBar;
