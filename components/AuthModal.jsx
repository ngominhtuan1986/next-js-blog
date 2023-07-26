'use client';

import authHook from '@/hooks/authHook';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { BiChevronDown } from 'react-icons/bi';

const AuthModal = ({ register, signin, label }) => {
	const session = useSession()
	const useAuthHook = authHook();

	if (!useAuthHook.isAuthOpen) return null;

	const userRegister = async (e) => {
		e.preventDefault();
		const newUser = {
			name: e.target[0].value,
			username: e.target[1].value,
			email: e.target[2].value,
			password: e.target[3].value,
		};
		await axios
			.post('api/auth/register', newUser)
			.then((r) => {
				signIn('credentials', {
					email: newUser.email,
					password: newUser.password,
					redirect: false,
				});
				toast.success(`Welcome onboard, ${r.data}`, {
					duration: 3000,
				});
				useAuthHook.onDelay();
			})
			.catch((e) =>
				toast.error(
					e?.response?.data.charAt(0).toUpperCase() +
						e?.response?.data.slice(1),
					{
						style: {
							color: '#ffffff',
							background: '#2a2a2a',
						},
					}
				)
			);
	};

	const userLogin = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;
		const res = await signIn('credentials', {
			email,
			password,
			redirect: false,
		}).then((r) => {
			if (r.error === 'User not found' || r.error === 'Wrong password') {
				toast.error(r.error);
			} else {
				toast.success(`Welcome back`);
				useAuthHook.onDelay();
			}
		});
	};

	if (session.status === 'loading') return null;

	return (
		<div
			className={`${
				!useAuthHook.isDelay ? 'slideUp' : 'slideDown'
			} fixed w-full h-full top-0 left-0 right-0 bottom-0  bg-gradient-to-t from-gray-100 z-50 flex justify-center items-center backdrop-blur-md`}
		>
			<form
				onSubmit={useAuthHook.isRegister ? userRegister : userLogin}
				className="flex flex-col bg-white p-7 rounded-md gap-3 min-w-[500px] shadow-lg relative"
			>
				<BiChevronDown
					size={32}
					className={`absolute z-50 right-5 top-5 cursor-pointer text-neutral-400 transition ${
						useAuthHook.isRegister
							? 'hover:text-blue-500'
							: 'hover:text-orange-500'
					} `}
					onClick={useAuthHook.onDelay}
				/>
				<label className="text-3xl font-bold pb-4">{label}</label>
				{register && (
					<>
						<input
							type="text"
							placeholder="Name"
							required
							className="inputAuth"
						/>
						<input
							type="text"
							placeholder="Username"
							required
							className="inputAuth"
						/>
					</>
				)}
				<input
					type="email"
					placeholder="Email"
					required
					className="inputAuth"
				/>
				<input
					type="password"
					placeholder="Password"
					required
					className="inputAuth"
				/>
				{register && (
					<button className="btnAuth pt-3 bg-blue-500 text-white hover:bg-blue-600 transition">
						Register
					</button>
				)}
				{signin && (
					<button className="btnAuth pt-3 bg-orange-500 text-white hover:bg-orange-600 transition">
						Login
					</button>
				)}
				<p className="text-xs font-light text-neutral-500">
					Forget your credentials? Click to reset
				</p>
			</form>
		</div>
	);
};

export default AuthModal;
