import React from "react";
import Image from "next/image";
import styles from "./socials.module.css";

const socials = () => {
	const loginwithgoogle = () => {
		window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`, "_self");
	};
	const loginwithgithub = () => {
		window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/github/callback`, "_self");
	};

	return (
		<div className={styles.socials}>
			<Image
				className={styles.image}
				src="/google.svg"
				alt="google"
				width={90}
				height={35}
				onClick={loginwithgoogle}
			/>
			<Image
				className={styles.image}
				src="/github.svg"
				alt="github"
				width={90}
				height={35}
				onClick={loginwithgithub}
			/>
		</div>
	);
};

export default socials;
