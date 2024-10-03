"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./forminput.module.css";
import AuthContext from "@/app/store/auth-context";
import ErrorContext from "@/app/store/error-context";
import ErrorModal from "../ErrorModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Forminput = () => {
	const authCtx = useContext(AuthContext);
	const tokenRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const errorCtx = useContext(ErrorContext);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const init = async () => {
			if (
				authCtx.userinfo &&
				authCtx.userinfo.isTwoFactor &&
				authCtx.userinfo.email &&
				authCtx.userinfo.isTwoFactorVerified === false
			) {
				await authCtx.sendVerificationMail(
					authCtx.userinfo.email,
					"Two Factor Authentication",
					"<b>Verify Your Account. Token Will Expire in 10mins.</b><br>",
					"Verify Your Account. Token Will Expire in 10mins.",
					"",
					true
				);
				errorCtx.seterror([
					"Verification Mail Sent. Please Check Your Mail.",
				]);
			}
		};

		init();
	}, [authCtx.userinfo]);

	useEffect(() => {
		if (
			(authCtx.userinfo &&
				authCtx.userinfo.isTwoFactor === true &&
				authCtx.userinfo.isTwoFactorVerified === true) ||
			(authCtx.userinfo && !authCtx.userinfo.isTwoFactor)
		) {
			router.replace("/");
		}
	}, [authCtx.userinfo]);

	const clickHandler = async () => {
		if (tokenRef.current && tokenRef.current.value !== "") {
			setLoading(true);
			const verified = await authCtx.verifyToken(
				tokenRef.current.value,
				"two-factor"
			);
			if (verified === true) {
				router.replace("/");
				errorCtx.seterror(["Two Factor Verification Done."]);
			}
			if (verified === false) {
				errorCtx.seterror([
					"Link Is Expired Or Incorrect. Please Check.",
				]);
			}
			setLoading(false);
		} else if (tokenRef.current && tokenRef.current.value === "") {
			errorCtx.seterror(["Please Enter Token."]);
		}
	};

	return (
		<React.Fragment>
			{errorCtx.error.length > 0 && <ErrorModal error={errorCtx.error} />}
			<input
				className={styles.input}
				type="text"
				placeholder="Token"
				ref={tokenRef}
			/>
			{loading ? (
				<Image
					className={styles.image}
					src="/loading.svg"
					alt="logo"
					width={40}
					height={40}
				/>
			) : (
				<button
					className={styles.logbutton}
					onClick={clickHandler}
				>
					Verify
				</button>
			)}
			<button
				onClick={authCtx.onLogout}
				className={styles.button}
			>
				Logout
			</button>
		</React.Fragment>
	);
};

export default Forminput;
