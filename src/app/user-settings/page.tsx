"use client";

import Auth from "@/middleware/Auth";
import { useContext } from "react";
import ErrorContext from "@/app/store/error-context";
import ErrorModal from "./../components/ErrorModal";
import Usersettings from "../components/UserSettings/userSettings";
import styles from "./page.module.css";

const UserSettings = () => {
	const errorCtx = useContext(ErrorContext);

	return (
		<main className={styles.main}>
			{errorCtx.error.length > 0 && <ErrorModal error={errorCtx.error} />}
			<Usersettings />
		</main>
	);
};

export default Auth(UserSettings);
