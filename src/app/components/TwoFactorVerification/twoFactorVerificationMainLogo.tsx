"use client";

import React from "react";
import Image from "next/image";
import styles from "./twoFactorVerificationMainLogo.module.css";
import { useRouter } from "next/navigation";

const TwoFactorVerificationMainLogo = () => {
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

export default TwoFactorVerificationMainLogo;
