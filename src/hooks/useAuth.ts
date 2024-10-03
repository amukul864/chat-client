import { useContext, useEffect, useState } from "react";
import axios from "@/utils/axios";
import AuthContext from "@/app/store/auth-context";
import { AxiosError } from "axios";
import ErrorContext from "@/app/store/error-context";

const useAuth = () => {
	const authCtx = useContext(AuthContext);
	const errorCtx = useContext(ErrorContext);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/check`,
					{
						withCredentials: true,
					}
				);
				if (res.status === 200) {
					authCtx.saveUserData(res.data.user);
					setIsAuthenticated(true);
				} else {
					console.log(res.data.error);
					setIsAuthenticated(false);
				}
			} catch (err) {
				const error = err as AxiosError<any>;
				errorCtx.seterror([error.response?.data.error.message]);
				setIsAuthenticated(false);
			}
		};

		checkAuth();
	}, []);

	return isAuthenticated;
};

export default useAuth;
