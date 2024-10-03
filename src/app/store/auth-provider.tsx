"use client";

import { useContext, useState } from "react";
import AuthContext from "./auth-context";
import axios from "@/utils/axios";
import User from "@/interfaces/user";
import { useRouter } from "next/navigation";
import ErrorContext from "./error-context";
import { AxiosError } from "axios";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}): any => {
	const router = useRouter();
	const [userinfo, setUserinfo] = useState<User | null>(null);
	const errorCtx = useContext(ErrorContext);

	const logoutHandler = async () => {
		if (userinfo) {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
					{
						withCredentials: true,
					}
				);
				if (response.status === 204) {
					setUserinfo(null);
				}
				router.push("/signin");
				return;
			} catch (err) {
				const error = err as AxiosError<any>;
				errorCtx.seterror([error.response?.data.error.message]);
			}
		}
	};

	const loginHandler = async (username: string, password: string) => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local`;
		const data = {
			username,
			password,
		};
		try {
			await axios.post(url, data, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			router.replace("/");
			return;
		} catch (err) {
			const error = err as AxiosError<any>;
			errorCtx.seterror([error.response?.data.error.message]);
		}
	};

	const signupHandler = async (
		username: string,
		password: string,
		first: string,
		last: string,
		email: string
	) => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;
		const data = {
			username,
			password,
			first,
			last,
			email,
		};
		try {
			await axios.post(url, data, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			errorCtx.seterror(["User Created. Please Sign In."]);
			return;
		} catch (err) {
			const error = err as AxiosError<any>;
			errorCtx.seterror([error.response?.data.error.message]);
		}
	};

	const saveUserData = (user: User) => {
		setUserinfo(user);
	};

	const sendVerificationMail = async (
		email: string,
		subject: string,
		html: string,
		text: string,
		url: string,
		isTwoFactorToken?: boolean
	) => {
		const backend_url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sendVerificationMail`;
		const data = { email, subject, html, text, url, isTwoFactorToken };

		try {
			await axios.post(backend_url, data, {
				withCredentials: true,
			});
			console.log("sent");
			return;
		} catch (err) {
			const error = err as AxiosError<any>;
			errorCtx.seterror([error.response?.data.error.message]);
		}
	};

	const verifyToken = async (token: string, tokenType: string) => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/verifyToken/${tokenType}/${token}`;

		try {
			const response = await axios.get(url, {
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			});
			if (response.data.verified === "true") {
				return true;
			}
			return false;
		} catch (err) {
			const error = err as AxiosError<any>;
			errorCtx.seterror([error.response?.data.error.message]);
			return false;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				userinfo: userinfo,
				onLogout: logoutHandler,
				onLogin: loginHandler,
				onSignup: signupHandler,
				saveUserData,
				sendVerificationMail,
				verifyToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
