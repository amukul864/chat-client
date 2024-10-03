import React from "react";
import styles from "./signin.module.css";
import SigninMainLogo from "./signinMainLogo";
import Socials from "./socials";
import FormInput from "./forminput";
import { useRouter } from "next/navigation";

const Signin = () => {
	const router = useRouter();

	const clickHandler = () => {
		router.push("/signup");
	};

	return (
		<div className={styles.form}>
			<div className={styles.leftform}>
				<SigninMainLogo />
				<div className={styles.inputform}>
					<p className={styles.maintext2}>Welcome Back To JustChat</p>
					<p className={styles.maintext3}>Sign In To Continue</p>
					<Socials />
					<div className={styles.horizontal}>
						<div className={styles.rule}></div>
						<p>or</p>
						<div className={styles.rule}></div>
					</div>
					<FormInput />
				</div>
			</div>
			<div className={styles.rightform}>
				<div className={styles.flex}>
					<p className={styles.maintext}>New Here?</p>
					<p className={styles.maintext3}>
						Chat With Your Friends and Strangers
					</p>
					<button
						className={styles.signbutton}
						onClick={clickHandler}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
};

export default Signin;
