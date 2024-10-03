import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./store/auth-provider";
import UserProvider from "./store/user-provider";
import { Suspense } from "react";
import ErrorProvider from "./store/error-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "JustChat | Chat With Your Friends and Strangers",
	description: "Chat With Your Friends and Strangers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning={true}
		>
			<head>
				<link
					rel="icon"
					href="/favicon.png"
					sizes="any"
				/>
			</head>
			<body
				className={inter.className}
				suppressHydrationWarning={true}
			>
				<ErrorProvider>
					<AuthProvider>
						<UserProvider>
							<Suspense>
								<div id="error-modal-root"></div>
								{children}
								<div id="root"></div>
							</Suspense>
						</UserProvider>
					</AuthProvider>
				</ErrorProvider>
			</body>
		</html>
	);
}
