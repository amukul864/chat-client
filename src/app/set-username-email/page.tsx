"use client";

import Auth from "@/middleware/Auth";
import styles from "./page.module.css";
import Setusernameemail from "../components/SetUsernameEmail/setUsernameEmail";

const SetUsernameEmail = () => {
	return (
		<main className={styles.main}>
			<Setusernameemail />
		</main>
	);
};

export default Auth(SetUsernameEmail);
