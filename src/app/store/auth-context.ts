"use client";

import React from "react";
import User from "@/interfaces/user";

interface AuthContextType {
	userinfo: User | null;
	onLogout: () => Promise<void>;
	onLogin: (username: string, password: string) => Promise<void>;
	onSignup: (
		username: string,
		password: string,
		first: string,
		last: string,
		email: string
	) => Promise<void>;
	saveUserData: (user: User) => void;
	sendVerificationMail: (
		email: string,
		subject: string,
		html: string,
		text: string,
		url: string,
		isTwoFactorToken?: boolean
	) => Promise<void>;
	verifyToken: (token: string, tokenType: string) => Promise<boolean>;
}

const AuthContext = React.createContext<AuthContextType>({
	userinfo: null,
	onLogout: async () => {},
	onLogin: async (username: string, password: string) => {},
	onSignup: async (
		username: string,
		password: string,
		first: string,
		last: string,
		email: string
	) => {},
	saveUserData: (user: User) => {},
	sendVerificationMail: async (
		email: string,
		subject: string,
		html: string,
		text: string,
		url: string,
		isTwoFactorToken?: boolean
	) => {},
	verifyToken: async (token: string, tokenType: string) => false,
});

export default AuthContext;
