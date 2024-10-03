import React from "react";
import styles from "./setUsernameEmail.module.css";
import SetUsernameEmailMainLogo from "./setUsernameEmailMainLogo";
import FormInput from "./forminput";

const Setusernameemail = () => {
	return (
		<div className={styles.form}>
			<div className={styles.leftform}>
				<SetUsernameEmailMainLogo />
				<div className={styles.inputform}>
					<p className={styles.maintext2}>Set Username And Email</p>
					<FormInput />
				</div>
			</div>
		</div>
	);
};

export default Setusernameemail;
