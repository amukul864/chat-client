"use client";

import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ErrorModal.module.css";
import ErrorContext from "../store/error-context";

interface ModalProps {
	error: string[];
	isNotDismissable?: boolean;
}

const ErrorModal: React.FC<ModalProps> = ({ error, isNotDismissable }) => {
	const [isMounted, setIsMounted] = useState(false);
	const errorCtx = useContext(ErrorContext);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const clickHandler = () => {
		if (isNotDismissable === true) {
			return;
		}
		errorCtx.seterror([]);
	};

	if (!isMounted || typeof window === "undefined") {
		return null;
	}

	return ReactDOM.createPortal(
		<div
			className={styles.modal}
			onClick={clickHandler}
		>
			<div className={styles.card}>
				{error.map((item, index) => (
					<div
						key={index}
						className={`${styles.item}`}
					>
						{item}
					</div>
				))}
			</div>
		</div>,
		document.getElementById("error-modal-root") as HTMLElement
	);
};

export default ErrorModal;
