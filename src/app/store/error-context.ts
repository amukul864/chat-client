"use client";
import React from "react";

interface ErrorContextType {
	seterror: (error: string[]) => void;
	error: string[];
}

const ErrorContext = React.createContext<ErrorContextType>({
	seterror: (error: string[]) => {},
	error: [],
});

export default ErrorContext;
