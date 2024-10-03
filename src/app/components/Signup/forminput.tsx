"use client";

import React, { useContext, useRef, useState } from "react";
import styles from "./forminput.module.css";
import AuthContext from "@/app/store/auth-context";
import UserContext from "@/app/store/user-context";
import ErrorContext from "@/app/store/error-context";
import ErrorModal from "../ErrorModal";
import Image from "next/image";

const Forminput = () => {
	const authCtx = useContext(AuthContext);
	const errorCtx = useContext(ErrorContext);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const firstRef = useRef<HTMLInputElement>(null);
	const lastRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const userCtx = useContext(UserContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [text, setText] = useState<string>("");

	const signupHandler = async () => {
		const username = usernameRef.current!.value.trim();
		const pass = passRef.current!.value.trim();
		const first = firstRef.current!.value.trim();
		const last = lastRef.current!.value.trim();
		const email = emailRef.current!.value.trim();
		if (
			username.length < 1 ||
			pass.length < 1 ||
			first.length < 1 ||
			last.length < 1 ||
			email.length < 1
		) {
			errorCtx.seterror(["Any Field Cannot Be Empty"]);
			return;
		}
		setLoading(true);
		await authCtx.onSignup(username, pass, first, last, email);
		usernameRef.current!.value = "";
		passRef.current!.value = "";
		lastRef.current!.value = "";
		firstRef.current!.value = "";
		emailRef.current!.value = "";
		setLoading(false);
	};

	const usernameHandler = async () => {
		const username = usernameRef.current!.value.trim();
		if (username.length < 1) {
			errorCtx.seterror(["Please Enter Username"]);
			return;
		}
		const isAvailable = await userCtx.isUsernameAvailable(username);
		setText(
			isAvailable ? "Username Is Available" : "Username Not Avalalable"
		);
	};

	return (
		<React.Fragment>
			{errorCtx.error.length > 0 && <ErrorModal error={errorCtx.error} />}
			<div className={styles.horizontal2}>
				<input
					className={styles.input2}
					type="text"
					placeholder="First Name"
					ref={firstRef}
				/>
				<input
					className={styles.input2}
					type="text"
					placeholder="Last Name"
					ref={lastRef}
				/>
			</div>
			<input
				className={styles.input}
				type="email"
				placeholder="Email"
				ref={emailRef}
			/>
			<input
				className={styles.input}
				type="text"
				placeholder="Username"
				ref={usernameRef}
			/>
			<button
				onClick={usernameHandler}
				className={styles.checkUsernameButton}
			>
				Check username
			</button>
			{text !== "" && <div className={styles.text}>{text}</div>}
			<input
				className={styles.input}
				type="password"
				placeholder="Password"
				ref={passRef}
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
					onClick={signupHandler}
				>
					Sign Up
				</button>
			)}
		</React.Fragment>
	);
};

export default Forminput;
