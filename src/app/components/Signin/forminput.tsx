"use client";

import React, {
	ChangeEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "./forminput.module.css";
import AuthContext from "@/app/store/auth-context";
import ErrorModal from "../ErrorModal";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorContext from "@/app/store/error-context";
import Image from "next/image";

const Forminput = () => {
	const authCtx = useContext(AuthContext);
	const errorCtx = useContext(ErrorContext);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const [keepSigned, setKeepSigned] = useState<boolean>(false);
	const params = useSearchParams();
	const token = params.get("token");
	const [isVerified, setIsVerified] = useState<boolean | null>(null);
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const signinHandler = async () => {
		const username = usernameRef.current!.value.trim();
		const pass = passRef.current!.value.trim();
		if (username.length < 1 || pass.length < 1) {
			errorCtx.seterror(["Any Field Cannot Be Empty"]);
			return;
		}
		setLoading(true);
		await authCtx.onLogin(
			username + " " + (keepSigned ? "30d" : "1d"),
			pass
		);
		usernameRef.current!.value = "";
		passRef.current!.value = "";
		setLoading(false);
	};

	const keepSignedHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setKeepSigned(event.target.checked);
	};

	const forgotPasswordHandler = async () => {
		if (usernameRef.current) {
			const username = usernameRef.current!.value.trim();
			if (username.length < 1) {
				errorCtx.seterror(["Please Enter Your Username Or Email"]);
				return;
			}
			setLoading(true);
			await authCtx.sendVerificationMail(
				username,
				"Forgot Password",
				"<b>Fogotten Password! Log in With the Following Link. Link Will Expire in 10mins.</b><br>",
				"Fogotten Password! Log in With the Following Link. Link Will Expire in 10mins.",
				"http:localhost:3000/signin"
			);
			setLoading(false);
			errorCtx.seterror([
				"Verification Mail Sent. Please Check Your Mail.",
			]);
		}
	};

	useEffect(() => {
		const init = async () => {
			if (token) {
				const verified = await authCtx.verifyToken(
					token,
					"forgot-password"
				);
				setIsVerified(verified);
				if (verified === true) {
					router.replace("/");
				}
			}
		};

		init();
	}, [token]);

	useEffect(() => {
		if (isVerified === false) {
			router.replace("/signin");
			errorCtx.seterror(["Link Is Expired Or Incorrect. Please Check."]);
		}
		if (isVerified === true) {
			router.replace("/");
		}
	}, [isVerified]);

	if (token) {
		return <>Verifying...</>;
	}

	return (
		<React.Fragment>
			{errorCtx.error.length > 0 && <ErrorModal error={errorCtx.error} />}
			<input
				className={styles.input}
				type="text"
				placeholder="Username Or Email"
				ref={usernameRef}
				name="username"
			/>
			<input
				className={styles.input}
				type="password"
				placeholder="Password"
				ref={passRef}
				name="password"
			/>
			<div className={styles.flex}>
				<input
					type="checkbox"
					className={styles.checkbox}
					onChange={keepSignedHandler}
				/>
				<div className={styles.text}>Keep Me Signed In For 30 Days</div>
			</div>
			<div
				onClick={forgotPasswordHandler}
				className={styles.text}
			>
				Forgot Password
			</div>
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
					onClick={signinHandler}
				>
					Log In
				</button>
			)}
		</React.Fragment>
	);
};

export default Forminput;
