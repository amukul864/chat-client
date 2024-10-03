"use client";

import styles from "./page.module.css";
import Signin from "../../components/Signin/signin"

export default function SignIn() {
	return (
		<main className={styles.main}>
			<Signin />
		</main>
	);
}
