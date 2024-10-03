import React from "react";
import styles from "./signup.module.css";
import SignupMainLogo from "./signupMainLogo";
import Socials from "./socials";
import FormInput from "./forminput";
import { useRouter } from "next/navigation";

const Signup = () => {
	const router = useRouter();

	const clickHandler = () => {
		router.push("/signin");
	};
	return (
		<div className={styles.form}>
			<div className={styles.leftform}>
				<SignupMainLogo />
				<div className={styles.inputform}>
					<p className={styles.maintext2}>Join Us Today</p>
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
					<p className={styles.maintext4}>Already Have An Account?</p>
					<p className={styles.maintext3}>
						Chat With Your Friends and Strangers
					</p>
					<button
						className={styles.signbutton}
						onClick={clickHandler}
					>
						Log In
					</button>
				</div>
			</div>
		</div>
	);
};

export default Signup;
