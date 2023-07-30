'use client';

import authHook from '@/hooks/authHook';
import composeHook from '@/hooks/composeHook';
import { useSession } from 'next-auth/react';
import { BiMessageSquareAdd, BiSearch } from 'react-icons/bi';

const SearchWidget = () => {
	const session = useSession();
	const useAuthHook = authHook();
	const useComposeHook = composeHook();

	const handleSearch = () => {};

	return (
		<div className="flex relative justify-center items-center gap-2 rounded-full p-2 transition ">
			<div className="cursor-pointer p-[9px] text-orange-400 hover:text-white hover:bg-orange-500 bg-white border border-orange-400 rounded-full flex text-[19px] justify-center items-center transition">
				<BiMessageSquareAdd
					onClick={
						session?.status === 'authenticated'
							? useComposeHook.onToggle
							: () => useAuthHook.onOpen(false)
					}
				/>
			</div>
			<form
				onClick={handleSearch}
				className="flex justify-center items-center border focus-within:border-neutral-400 rounded-full p-[2px] pl-4"
			>
				<input type="text" className="w-full " />
				<BiSearch className="text-[25pt] cursor-pointer rounded-full bg-white hover:bg-neutral-400 hover:text-white transition flex justify-center items-center p-[7px] text-neutral-300" />
			</form>
		</div>
	);
};

export default SearchWidget;
