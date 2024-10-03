"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./forminput.module.css";
import AuthContext from "@/app/store/auth-context";
import UserContext from "@/app/store/user-context";
import ErrorContext from "@/app/store/error-context";
import ErrorModal from "../ErrorModal";
import Image from "next/image";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";

const Forminput = () => {
	const authCtx = useContext(AuthContext);
	const errorCtx = useContext(ErrorContext);
	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const userCtx = useContext(UserContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [text, setText] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		if (emailRef.current && authCtx.userinfo?.email) {
			emailRef.current.value = authCtx.userinfo?.email;
		}
	}, [emailRef.current]);

	if (authCtx.userinfo && authCtx.userinfo.isUsernameEmailThere === true) {
		router.replace("/");
		return (
			<Image
				className={styles.image}
				src="/loading.svg"
				alt="logo"
				width={40}
				height={40}
			/>
		);
	}

	const changeUsernameEmail = async (username: string, email: string) => {
		const data = {
			username,
			email,
		};
		const url = `${process.env.NEXT_PUBLIC_API_URL}/user/changeUsernameEmail`;
		try {
			const response = await axios.post(url, data, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			if (response.data.changed === "true") {
				return true;
			}
		} catch (err) {
			const error = err as AxiosError<any>;
			errorCtx.seterror([error.response?.data.error.message]);
			return false;
		}
	};

	const clickHandler = async () => {
		if (usernameRef.current && emailRef.current) {
			const username = usernameRef.current!.value.trim();
			const email = emailRef.current!.value.trim();
			if (username.length < 1 || email.length < 1) {
				errorCtx.seterror(["Any Field Cannot Be Empty"]);
				return;
			}
			setLoading(true);
			const changed = await changeUsernameEmail(username, email);
			if (changed === true) {
				errorCtx.seterror(["Username And Email Updated"]);
				router.replace("/");
			}
			setLoading(false);
		}
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
				className={styles.button}
			>
				Check username
			</button>
			{text !== "" && <div className={styles.text}>{text}</div>}
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
					Set Username And Email
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
