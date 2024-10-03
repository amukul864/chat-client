"use client";

import Auth from "@/middleware/Auth";
import styles from "./page.module.css";
import Twofactorverification from "../components/TwoFactorVerification/twoFactorVerification";

const TwoFactorVerification = () => {
	return (
		<main className={styles.main}>
			<Twofactorverification />
		</main>
	);
};

export default Auth(TwoFactorVerification);
