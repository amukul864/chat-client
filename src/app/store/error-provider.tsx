"use client";

import { useState } from "react";
import ErrorContext from "./error-context";

const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}): any => {
	const [error, setError] = useState<string[]>([]);

	const seterror = (error: string[]) => {
		setError(error);
	};

	return (
		<ErrorContext.Provider
			value={{
				error,
				seterror,
			}}
		>
			{children}
		</ErrorContext.Provider>
	);
};

export default ErrorProvider;
