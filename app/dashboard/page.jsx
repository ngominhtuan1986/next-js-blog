'use client';

import FavPosts from '@/components/FavPosts';
import { ProfileDashboard } from '@/components/ProfileDashboard';
import UserPosts from '@/components/UserPosts';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
	const session = useSession();
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState();

	const fetchCurrentUser = async () => {
		session.status === 'authenticated' &&
			(await axios
				.get(`/api/user/${session.data.id}`)
				.then((r) => {
					setCurrentUser(r.data);
				})
				.catch((e) => console.log(e)));
	};

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	if (session.status === 'loading') return <div className='flex justify-center'>...Loading</div>;

	if (session.status === 'unauthenticated') router?.push('/');

	if (session.status === 'authenticated') {
		return (
			<div className="flex justify-center ">
				<div className="container grid md:grid-cols-4 gap-8">
					<div className="col-span-1">
						<div className="sticky top-20 z-20">
							<div className="text-md text-neutral-700 font-bold pt-3 pb-3 uppercase ">
								Profile
							</div>
							<ProfileDashboard />
						</div>
					</div>
					<div className="md:col-span-2">
						<div className=" text-md uppercase text-neutral-700 font-bold  sticky z-20 top-20 pt-3 pb-3 bg-white">
							My posts
						</div>
						<UserPosts />
					</div>
					<div className="col-span-1">
						<div className="text-md uppercase text-neutral-700 font-bold sticky z-20 top-20 pt-3 pb-3 bg-white  ">
							Favourite posts
						</div>
						{currentUser && <FavPosts currentUser={currentUser} />}
					</div>
				</div>
			</div>
		);
	}
};

export default Dashboard;
