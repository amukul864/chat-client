import React from "react";
import styles from "./userSettings.module.css";
import UserSettingsMainLogo from "./userSettingsMainLogo";
import FormInput from "./forminput";

const Usersettings = () => {
	return (
		<div className={styles.form}>
			<div className={styles.leftform}>
				<UserSettingsMainLogo />
				<div className={styles.inputform}>
					<p className={styles.maintext2}>User Settings</p>
					<FormInput />
				</div>
			</div>
		</div>
	);
};

export default Usersettings;
