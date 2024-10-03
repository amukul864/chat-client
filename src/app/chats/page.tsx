"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Auth from "@/middleware/Auth";

const Home = () => {
	return (
		<main className={styles.main}>
			<aside className={styles.sidebar}>
				<div className={styles.vertical}>
					<Image
						className={styles.image}
						src="/logonobgblack.png"
						alt="logo"
						width={150}
						height={80}
					/>
					<button className={styles.chats}>Chats</button>
					<button className={styles.chats}>Groups</button>
				</div>
				<div className={styles.vertical}>
					<button className={styles.chats}>Random Chats</button>
					<button className={styles.chats}>Random Rooms</button>
					<div className={styles.horizontalrule}></div>
					<button className={styles.chats}>
						<Image
							className={styles.profilepic}
							src="/favicon.png"
							alt="profile"
							width={25}
							height={25}
						/>
						<p className={styles.profiletext}>First Name</p>
					</button>
				</div>
			</aside>
			<div className={styles.chatsection}>
				<div className={styles.profileinfo}>
					<Image
						className={styles.profilepic2}
						src="/favicon.png"
						alt="profile"
						width={50}
						height={50}
					/>
					<p className={styles.profiletext2}>Name</p>
				</div>
				<div className={styles.messages}>
					<div className={styles.chatdate}>Tuesday</div>
					<div className={styles.recieved}>
						<Image
							className={styles.profilepicrecieved}
							src="/favicon.png"
							alt="profile"
							width={30}
							height={30}
						/>
						<div className={styles.recievedtext}>
							<div>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est
								laborum.1
							</div>
							<div className={styles.texttime}>
								20/07/2004 15:27
							</div>
						</div>
					</div>
					<div className={styles.sent}>
						<Image
							className={styles.profilepicsent}
							src="/favicon.png"
							alt="profile"
							width={30}
							height={30}
						/>
						<div className={styles.senttext}>
							<div>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</div>
							<div className={styles.texttime}>
								20/07/2024 15:27
							</div>
						</div>
					</div>
					<div className={styles.recieved}>
						<Image
							className={styles.profilepicrecieved}
							src="/favicon.png"
							alt="profile"
							width={30}
							height={30}
						/>
						<div className={styles.recievedtext}>
							<div>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est
								laborum.1
							</div>
							<div className={styles.texttime}>
								20/07/2004 15:27
							</div>
						</div>
					</div>
					<div className={styles.sent}>
						<Image
							className={styles.profilepicsent}
							src="/favicon.png"
							alt="profile"
							width={30}
							height={30}
						/>
						<div className={styles.senttext}>
							<div>
								Lorem ipsum dolor sit amet, consectetur
							</div>
							<div className={styles.texttime}>
								20/07/2024 15:27
							</div>
						</div>
					</div>
				</div>
				<div className={styles.writemessage}>
					<input
						className={styles.input}
						type="text"
						placeholder="Type A Message"
					/>
					<Image
						className={styles.sendpic}
						src="/send.svg"
						width={45}
						height={45}
						alt="send"
					/>
				</div>
			</div>
		</main>
	);
};

export default Auth(Home);
