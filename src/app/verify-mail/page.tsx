"use client";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ErrorContext from "@/app/store/error-context";
import ErrorModal from "./../components/ErrorModal";
import styles from "./page.module.css";
import Image from "next/image";

const VerifyMail = () => {
	const authCtx = useContext(AuthContext);
	const errorCtx = useContext(ErrorContext);
	const router = useRouter();
	const params = useSearchParams();
	const token = params.get("token");
	const [isVerified, setIsVerified] = useState<boolean | null>(null);

	useEffect(() => {
		const init = async () => {
			if (
				authCtx.userinfo &&
				authCtx.userinfo.isVerified === false &&
				authCtx.userinfo.email
			) {
				await authCtx.sendVerificationMail(
					authCtx.userinfo.email,
					"Verify Mail",
					"<b>Verify Your Email. Link Will Expire in 10mins.</b><br>",
					"Verify Your Email. Link Will Expire in 10mins.",
					"http:localhost:3000/verify-mail"
				);
				errorCtx.seterror([
					"Verification Mail Sent. Please Check Your Mail.",
				]);
			} else if (token) {
				const verified = await authCtx.verifyToken(
					token,
					"verify-mail"
				);
				setIsVerified(verified);
			} else {
				authCtx.onLogout();
				router.replace("/signin");
			}
		};

		init();
	}, [authCtx.userinfo, token]);

	if (token && isVerified === true) {
		authCtx.onLogout();
		router.replace("/signin");
		errorCtx.seterror(["Verification Successfull Please Sign In."]);
	}

	return (
		<div className={styles.main}>
			<div className={styles.form}>
				{errorCtx.error.length > 0 ? (
					<ErrorModal
						error={errorCtx.error}
						isNotDismissable
					/>
				) : (
					<Image
						className={styles.image}
						src="/loading.svg"
						alt="logo"
						width={40}
						height={40}
					/>
				)}
			</div>
		</div>
	);
};

export default VerifyMail;
