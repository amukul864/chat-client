import ErrorModal from "./components/ErrorModal";
import styles from "./not-found.module.css";

const NotFound = () => {
	return (
		<main className={styles.main}>
			<div className={styles.form}>
				<ErrorModal
					error={["OOPS! Page Not Found"]}
					isNotDismissable={true}
				/>
			</div>
		</main>
	);
};

export default NotFound;
