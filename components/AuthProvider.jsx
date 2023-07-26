'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import ComposeModal from '@/components/ComposeModal';
import AuthModal from '@/components/AuthModal';
import NavBar from '@/components/NavBar';
import authHook from '@/hooks/authHook';
import composeHook from '@/hooks/composeHook';

const AuthProvider = ({ children }) => {
	const useAuthHook = authHook();
	const useComposeHook = composeHook();

	return (
		<SessionProvider>
			<Toaster />
			{useAuthHook.isRegister && <AuthModal register label={'Register'} />}
			{!useAuthHook.isRegister && <AuthModal signin label={'Login'} />}
			{useComposeHook.isOpen && <ComposeModal />}
			<NavBar />
			{children}
		</SessionProvider>
	);
};

export default AuthProvider;
