import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { User, ContextData, Props, Notebook } from "../../src/interfaces";

export const AuthContext = createContext<ContextData | null>(null);

export const AuthProvider = ({ children }: Props) => {
	const [userData, setUserData] = useState<User | null>(null);
	const [notebookData, setNotebookData] = useState<Notebook | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getCurrUserData = async () => {
			try {
				const userDataResponse = await axios.get(
					"http://localhost:4000/api/currentUser",
					{
						withCredentials: true
					}
				);
				setUserData(userDataResponse.data);
			} catch (error) {
				console.error("There was an error", error);
			}
		};

		getCurrUserData();
	}, []);

	useEffect(() => {
		async function getCurrentUserNotebooks() {
			if (userData) {
				const notebookDataResponse = await axios.get(
					`http://localhost:4000/api/currentUser/notebooks/${userData.user_id}`,
					{
						withCredentials: true
					}
				);
				setNotebookData(notebookDataResponse.data);
			}
		}
		getCurrentUserNotebooks();
	}, [userData]);

	const signOut = async (): Promise<void> => {
		try {
			await axios.get("http://localhost:4000/api/signOut", {
				withCredentials: true
			});
			setUserData(null);
		} catch (error) {
			console.error("There was an error", error);
		}
	};

	const value: ContextData = {
		userData,
		error,
		signOut,
		notebookData
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
	return useContext(AuthContext);
};

export default useAuth;
