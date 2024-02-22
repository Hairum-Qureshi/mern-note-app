import { useState } from "react";
import auth_css from "../css/authentication.module.css";
import useAuthentication from "../hooks/useAuthentication";
import { Link } from "react-router-dom";

export default function SignUp() {
	const { signUp, alerts, errMessage } = useAuthentication();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<div className={auth_css.split}>
				<div className={`${auth_css.split} ${auth_css.left}`}>
					<div className={auth_css.centered}>
						<h2>WELCOME TO EASY NOTE</h2>
						<p>
							<b>AN EVERNOTE ALTERNATIVE FOR FREE!</b>
						</p>
					</div>
				</div>
			</div>

			<div className={`${auth_css.split} ${auth_css.right}`}>
				<div className={auth_css.centered}>
					<h2>JOIN EASY NOTE TODAY!</h2>
					<p>
						Already have an account? <Link to="/sign-in">Login!</Link>
					</p>
					<p>{errMessage}</p>
					<form action="">
						<input
							style={{
								border: `${
									alerts.emailEntered ? "1px solid lime" : "1px solid red"
								}`,
								transition: "border 0.5s ease"
							}}
							type="email"
							placeholder="Email"
							value={email}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setEmail(event.target.value)
							}
						/>
						<input
							style={{
								border: `${
									alerts.nameEntered ? "1px solid lime" : "1px solid red"
								}`,
								transition: "border 0.5s ease"
							}}
							type="text"
							placeholder="Name or username"
							value={name}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setName(event.target.value)
							}
						/>
						<input
							style={{
								border: `${
									alerts.passwordEntered ? "1px solid lime" : "1px solid red"
								}`,
								transition: "border 0.5s ease"
							}}
							type="password"
							placeholder="Password"
							value={password}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(event.target.value)
							}
						/>
						<button
							onClick={(
								event: React.MouseEvent<HTMLButtonElement, MouseEvent>
							) => {
								event.preventDefault();
								signUp(email, name, password);
							}}
						>
							Join
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
