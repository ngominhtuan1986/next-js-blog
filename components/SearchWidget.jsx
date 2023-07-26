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
		<div className="flex justify-center items-center gap-2  rounded-full p-2  transition">
			<BiMessageSquareAdd
				onClick={
					session?.status === 'authenticated'
						? useComposeHook.onToggle
						: () => useAuthHook.onOpen(false)
				}
				className="cursor-pointer text-[27pt] text-orange-400 border border-orange-400 rounded-full bg-white hover:bg-orange-600 hover:scale-110 hover:text-white transition flex justify-center items-center p-[8px]"
			/>
			<form
				onClick={handleSearch}
				className="flex justify-center items-center border rounded-full p-[2px] pl-4"
			>
				<input type="text" className="min-w-[15vw]" />
				<BiSearch className="text-[25pt] cursor-pointer rounded-full bg-white hover:bg-neutral-400 hover:text-white transition flex justify-center items-center p-[8px] text-black" />
			</form>
		</div>
	);
};

export default SearchWidget;
