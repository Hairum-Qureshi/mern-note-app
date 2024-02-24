import { useState } from "react";
import axios from "axios";
import { AlertState, ReturnTypes } from "../../src/interfaces";

export default function useAuthentication(): ReturnTypes {
	const [alerts, setAlerts] = useState<AlertState>({
		emailEntered: true,
		nameEntered: true,
		passwordEntered: true
	});

	const [errMessage, setErrMessage] = useState<string | undefined>();
	const emailRegex = /^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/;

	function handleAlerts(email: string, password: string, name?: string): void {
		if (!email && !password && !name) {
			setAlerts({
				emailEntered: false,
				nameEntered: false,
				passwordEntered: false
			});

			setErrMessage("Please be sure to fill in all the fields");
		} else if (email && password && name) {
			setAlerts({
				emailEntered: true,
				nameEntered: true,
				passwordEntered: true
			});

			setErrMessage("");
		} else {
			setAlerts({
				emailEntered: email ? true : false,
				nameEntered: name ? true : false,
				passwordEntered: password ? true : false
			});

			setErrMessage("Please be sure to fill in all the fields");
		}
	}

	function signUp(email: string, name: string, password: string): void {
		handleAlerts(email, password, name);

		const userData = {
			email,
			name,
			password
		};

		// if (name.trim() !== "") {
		// 	setAlerts({
		// 		emailEntered: true,
		// 		nameEntered: false,
		// 		passwordEntered: true
		// 	});
		// 	setErrMessage("Please be sure to fill in all the fields");
		// 	return;
		// }

		if (email && name && password) {
			if (!email.match(emailRegex)) {
				setAlerts({
					emailEntered: false,
					nameEntered: true,
					passwordEntered: true
				});
				setErrMessage("Incorrect email format");
				return;
			}

			if (name.length < 2 && name.trim() !== "") {
				setAlerts({
					emailEntered: true,
					nameEntered: false,
					passwordEntered: true
				});
				setErrMessage("(User) name must be at least 2 characters long");
				return;
			}

			if (password.length <= 10) {
				setAlerts({
					emailEntered: true,
					nameEntered: true,
					passwordEntered: false
				});
				setErrMessage("Password must be at least 10 characters");
				return;
			} else {
				axios
					.post(
						"http://localhost:4000/api/signUp",
						userData, // pass userData here
						{ withCredentials: true } // pass the configuration object
					)
					.then(response => {
						if (response.status === 200) {
							window.location.href = "/home";
							setErrMessage("");
						}
					})
					.catch(error => {
						if (error) {
							setAlerts({
								emailEntered: false,
								nameEntered: true,
								passwordEntered: true
							});
							setErrMessage(error.response.data.message);
						}
					});
			}
		}
	}

	function signIn(email: string, password: string): void {
		handleAlerts(email, password);
		const userData = {
			email,
			password
		};

		if (email && password) {
			if (!email.match(emailRegex)) {
				setAlerts({
					emailEntered: false,
					nameEntered: true,
					passwordEntered: true
				});
				setErrMessage("Incorrect email format");
				return;
			}
			axios
				.post("http://localhost:4000/api/signIn", userData, {
					withCredentials: true
				})
				.then(response => {
					if (response.status === 200) {
						setErrMessage("");
						window.location.href = "/home";
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
						if (
							error.response.data.message ==
							"There is no account associated with this email"
						) {
							setAlerts({
								emailEntered: false,
								passwordEntered: true
							});
							setErrMessage(error.response.data.message);
						} else if (error.response.data.message == "Incorrect password") {
							setAlerts({
								emailEntered: true,
								passwordEntered: false
							});
							setErrMessage(error.response.data.message);
						}
					}
				});
		}
	}

	return { signUp, alerts, signIn, errMessage };
}
