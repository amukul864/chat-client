"use client";

import { useContext } from "react";
import UserContext from "./user-context";
import axios from "@/utils/axios";
import AuthContext from "./auth-context";
import { ChangeUserInfo } from "@/interfaces/user";
import ErrorContext from "./error-context";
import { AxiosError } from "axios";

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}): any => {
	const authCtx = useContext(AuthContext);
	const errorCtx = useContext(ErrorContext);

	const isUsernameAvailable = async (username: string): Promise<boolean> => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/user/checkAvailableUsername/${username}`;

		try {
			const response = await axios.get(url, {
				withCredentials: true,
			});
			return response.data.isAvailable === "true" ? true : false;
		} catch (err) {
			const error = err as AxiosError<any>;
			errorCtx.seterror([error.response?.data.error.message]);
			return false;
		}
	};

	const changeUserInfo = async ({
		username,
		name,
		email,
		password,
		photo,
		isTwoFactor,
	}: ChangeUserInfo) => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/user/changeUserInfo`;
		const data = { username, name, email, password, photo, isTwoFactor };

		if (
			!username &&
			!name &&
			!email &&
			!password &&
			!photo &&
			!isTwoFactor
		) {
			errorCtx.seterror(["Please Enter The User Details To Be Changed"]);
			return false;
		}
		try {
			const response = await axios.post(url, data, {
				withCredentials: true,
			});
			authCtx.saveUserData(response.data.user);
			if (response.data.changed === "true") {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			const error = err as AxiosError<any>;
			errorCtx.seterror([error.response?.data.error.message]);
			return false;
		}
	};

	return (
		<UserContext.Provider
			value={{
				isUsernameAvailable,
				changeUserInfo,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
