"use client";

import { ChangeUserInfo } from "@/interfaces/user";
import React from "react";

interface UserContextType {
	isUsernameAvailable: (username: string) => Promise<boolean>;
	changeUserInfo: ({
		username,
		name,
		email,
		password,
		photo,
		isTwoFactor,
	}: ChangeUserInfo) => Promise<boolean>;
}

const UserContext = React.createContext<UserContextType>({
	isUsernameAvailable: async (username: string) => false,
	changeUserInfo: async ({
		username,
		name,
		email,
		password,
		photo,
		isTwoFactor,
	}: ChangeUserInfo) => false,
});

export default UserContext;
