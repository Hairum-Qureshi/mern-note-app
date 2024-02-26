import { useLocation, Link } from "react-router-dom";
import navbar_css from "../css/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightFromBracket,
	faBook,
	faHouse,
	faList,
	faStickyNote,
	faTrash
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../contexts/authContext";

export default function Navbar() {
	const location = useLocation();
	const { userData, signOut } = useAuth()!;

	return !userData ||
		location.pathname == "/" ||
		location.pathname == "/sign-up" ||
		location.pathname == "/sign-in" ? null : (
		<div className={navbar_css.navbar}>
			<h1>Easy Note</h1>
			<div className={navbar_css.links}>
				<Link to="/home">
					<span>
						<FontAwesomeIcon icon={faHouse} />
					</span>
					Home
				</Link>
				<Link to="/notes">
					<span>
						<FontAwesomeIcon icon={faStickyNote} />
					</span>
					Notes
				</Link>
				<Link to={`/notebooks/${userData.user_id}`}>
					<span>
						<FontAwesomeIcon icon={faBook} />
					</span>
					Notebooks
				</Link>
				<Link to="/tasks">
					<span>
						<FontAwesomeIcon icon={faList} />
					</span>
					Tasks
					{/* <span>10</span> */}
				</Link>
				<Link to="/trash">
					<span>
						<FontAwesomeIcon icon={faTrash} />
					</span>
					Trash
				</Link>
				{userData && userData.user_id ? (
					<Link to="/" onClick={signOut}>
						<span>
							<FontAwesomeIcon icon={faArrowRightFromBracket} />
						</span>
						Sign Out
					</Link>
				) : (
					""
				)}
			</div>
		</div>
	);
}
