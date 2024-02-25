import { Link } from "react-router-dom";
import landing_css from "../css/landing.module.css";
import useAuth from "../contexts/authContext";

export default function Landing() {
	const { userData, signOut } = useAuth()!;

	return (
		<>
			<div className={landing_css.navbar}>
				<h2>Easy Note</h2>
				<ul>
					{!userData ? (
						<>
							<li>
								<Link to="/sign-up">Sign Up</Link>
							</li>
							<li>
								<Link to="/sign-in">Sign In</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/home">Home</Link>
							</li>
							<li>
								<Link to="/" onClick={signOut}>
									Sign out
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
			<div>
				<h1>BETTER THAN EVERNOTE!</h1>
			</div>
		</>
	);
}
