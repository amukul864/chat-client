"use client";

import React from "react";
import Image from "next/image";
import styles from "./signinMainLogo.module.css"
import { useRouter } from "next/navigation";

const SigninMainLogo = () => {
	const router = useRouter();

	return (
		<div className={styles.logo}>
			<Image
				className={styles.image}
				src="/logonobgblack.png"
				alt="logo"
				width={200}
				height={105}
				onClick={() => {
					router.push("/");
				}}
			/>
		</div>
	);
};

export default SigninMainLogo;
