"use client";

import Auth from "@/middleware/Auth";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ErrorModal from "./components/ErrorModal";
import ErrorContext from "./store/error-context";

const HomePage = () => {
	const authCtx = useContext(AuthContext);
	const router = useRouter();
	const errorCtx = useContext(ErrorContext);

	return (
		<main className={styles.main}>
			{errorCtx.error.length > 0 && <ErrorModal error={errorCtx.error} />}
			<aside className={styles.sidebar}>
				<div className={styles.vertical}>
					<Image
						className={styles.image}
						src="/logonobgblack.png"
						alt="logo"
						width={150}
						height={80}
						onClick={() => {
							router.push("/");
						}}
					/>
				</div>
				<div className={styles.vertical}>
					<div className={styles.horizontalrule}></div>
					<button
						className={styles.chats}
						onClick={() => router.push("/user-settings")}
					>
						<Image
							className={styles.profilepic}
							src={
								authCtx.userinfo?.photo
									? authCtx.userinfo.photo
									: "/favicon.png"
							}
							alt="profile"
							width={25}
							height={25}
						/>
						<p className={styles.profiletext}>
							{authCtx.userinfo?.name.split(" ")[0]}
						</p>
					</button>
					<button
						className={styles.button}
						onClick={() => {
							authCtx.onLogout();
						}}
					>
						Logout
					</button>
				</div>
			</aside>
			<div className={styles.chatsection}>
				<div className={styles.profileinfo}>
					<Image
						className={styles.profilepic2}
						src={
							authCtx.userinfo?.photo
								? authCtx.userinfo.photo
								: "/favicon.png"
						}
						alt="profile"
						width={50}
						height={50}
					/>
					<p className={styles.profiletext2}>
						{authCtx.userinfo?.name}
					</p>
				</div>
			</div>
		</main>
	);
};

export default Auth(HomePage);
