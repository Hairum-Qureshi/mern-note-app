import { useLocation, Link } from "react-router-dom";
import navbar_css from "../css/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faList,
	faStickyNote,
	faTrash
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
	const location = useLocation();
	return location.pathname == "/" ||
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
			</div>
		</div>
	);
}
