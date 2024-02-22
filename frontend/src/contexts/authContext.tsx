// import { useState, useEffect, createContext, useContext } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
// 	const [userData, setUserData] = useState(null);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		const getCurrUserData = async () => {
// 			try {
// 				const response = await axios.get("http://localhost:4000/currentUser", {
// 					withCredentials: true
// 				});
// 				setUserData(response.data);
// 			} catch (error) {
// 				console.error("There was an error", error);
// 			}
// 		};

// 		getCurrUserData();
// 	}, []);

// 	const logOut = async () => {
// 		try {
// 			await axios.get("http://localhost:4000/logOut", {
// 				withCredentials: true
// 			});
// 			setUserData(null);
// 		} catch (error) {
// 			console.error("There was an error", error);
// 		}
// 	};

// 	const value = {
// 		userData,
// 		error,
// 		logOut
// 	};

// 	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
// 	return useContext(AuthContext);
// };
