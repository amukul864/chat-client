export default interface User {
	username: string;
	name: string;
	photo?: string | null;
	email?: string | null;
	isUsernameEmailThere: boolean;
	isVerified: boolean;
	isTwoFactor: boolean;
	isTwoFactorVerified: boolean;
}

export interface ChangeUserInfo {
	username?: string;
	name?: string;
	email?: string;
	password?: string;
	photo?: string;
	isTwoFactor?: boolean;
}
