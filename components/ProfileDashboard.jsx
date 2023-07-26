'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';

export const ProfileDashboard = () => {
	const session = useSession();
	return (
		<div className="flex flex-col pt-0 gap-3">
			<div className="aspect-square w-[100%] rounded-lg overflow-hidden">
				<Image
					src={session.data.user.avatar || '/placeholder.jpg'}
					width={500}
					height={500}
					alt=""
				/>
			</div>
			<form className="flex flex-col gap-1 justify-start items-start">
				<div className="flex items-center justify-between">
					<input
						disabled
						type="text"
						placeholder={session.data.user.name}
						className="w-[85%]"
					/>
					<div className="text-lg text-neutral-300 hover:text-neutral-800 hover:scale-110 transition cursor-pointer">
						<BiSolidMessageSquareEdit />
					</div>
				</div>
				<div className="flex items-center justify-between">
					<input
						disabled
						type="email"
						placeholder={session.data.user.email}
						className="w-[85%]"
					/>
					<div className="text-lg text-neutral-300 hover:text-neutral-800 hover:scale-110 transition cursor-pointer">
						<BiSolidMessageSquareEdit />
					</div>
				</div>
				<button className='border p-2 w-full mt-2 rounded-md'>Update</button>
			</form>
		</div>
	);
};
