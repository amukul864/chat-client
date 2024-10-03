import React from "react";
import styles from "./twoFactorVerification.module.css";
import TwoFactorVerificationMainLogo from "./twoFactorVerificationMainLogo";
import FormInput from "./forminput";

const Twofactorverification = () => {
	return (
		<div className={styles.form}>
			<div className={styles.leftform}>
				<TwoFactorVerificationMainLogo />
				<div className={styles.inputform}>
					<p className={styles.maintext2}>Two Factor Verification</p>
					<FormInput />
				</div>
			</div>
		</div>
	);
};

export default Twofactorverification;
