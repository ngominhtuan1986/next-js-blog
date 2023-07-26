import './globals.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
	title: 'Next Js Blog',
	description: 'Next Js Blog',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
