"use client";

import AuthContext from "@/app/store/auth-context";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import ErrorModal from "@/app/components/ErrorModal";
import styles from "./auth.module.css";

const Auth = (Component: React.ComponentType) => {
	return function AuthenticatedComponent(props: any) {
		const isAuthenticated = useAuth();
		const router = useRouter();
		const authCtx = useContext(AuthContext);

		useEffect(() => {
			if (isAuthenticated === false) {
				router.replace("/signin");
			}
		}, [router, isAuthenticated]);

		useEffect(() => {
			if (
				authCtx.userinfo &&
				authCtx.userinfo.isUsernameEmailThere === false
			) {
				router.replace("/set-username-email");
			}

			if (
				authCtx.userinfo &&
				authCtx.userinfo.isVerified === false &&
				authCtx.userinfo.isUsernameEmailThere === true
			) {
				router.replace("/verify-mail");
			}

			if (
				authCtx.userinfo &&
				authCtx.userinfo.isTwoFactor === true &&
				authCtx.userinfo.isTwoFactorVerified === false &&
				authCtx.userinfo.isVerified === true
			) {
				router.replace("/two-factor-verification");
			}
		}, [authCtx.userinfo]);

		const component = (
			<main className={styles.main}>
				<div className={styles.form}>
					<ErrorModal
						error={["Loading..."]}
						isNotDismissable={true}
					/>
				</div>
			</main>
		);

		if (
			isAuthenticated === null ||
			isAuthenticated === false ||
			!authCtx.userinfo
		) {
			return component;
		}

		return <Component {...props} />;
	};
};

export default Auth;
