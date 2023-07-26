'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import ComposeModal from '@/components/ComposeModal';
import AuthModal from '@/components/AuthModal';
import NavBar from '@/components/NavBar';
import authHook from '@/hooks/authHook';
import composeHook from '@/hooks/composeHook';

export const metadata = {
	title: 'Next Js Blog',
	description: 'Next Js Blog',
};

export default function RootLayout({ children }) {
	const useAuthHook = authHook();
	const useComposeHook = composeHook();
	return (
		<html lang="en">
			<SessionProvider>
				<body>
					<Toaster />
					{useAuthHook.isRegister && <AuthModal register label={'Register'} />}
					{!useAuthHook.isRegister && <AuthModal signin label={'Login'} />}
					{useComposeHook.isOpen && <ComposeModal />}
					<NavBar />
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}
