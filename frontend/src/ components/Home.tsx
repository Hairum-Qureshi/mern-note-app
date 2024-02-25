import { useEffect, useState } from "react";
import home_css from "../css/home.module.css";
import useCurrentTime from "../hooks/useCurrentTime";
import { tailspin } from "ldrs";
import useAuth from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

tailspin.register();

export default function Home() {
	const { userData } = useAuth();
	const [user_name, setUsername] = useState<string>();
	const [user_id, setUserID] = useState<string>();
	const [profilePicture, setProfilePicture] = useState<string>();
	const [notes, setNotes] = useState<string>();

	useEffect(() => {
		if (userData) {
			const { name: user_name, user_id, profilePicture } = userData;
			setUsername(user_name);
			setUserID(user_id);
			setProfilePicture(profilePicture);
			setNotes(localStorage.getItem(`notes#${user_id}`)!);
		}
	}, [userData]);

	const { currentDate, currentTime, greeting } = useCurrentTime();
	return !userData ? (
		<NotFound />
	) : !currentDate && !currentTime && !greeting ? (
		// Default values shown
		<div className={home_css.contentContainer}>
			<div className={home_css.loadingContainer}>
				<l-tailspin size="60" stroke="5" speed="0.60" color="lime"></l-tailspin>
			</div>
		</div>
	) : (
		<div className={home_css.contentContainer}>
			<div className={home_css.subNavbar}>
				<img src={profilePicture} alt="User profile picture" />
				<span>
					{greeting}, {user_name}!
				</span>
				<span>
					{currentDate} | {currentTime}
				</span>
			</div>
			<div className={home_css.background}>
				<button>CHANGE</button>
				<img
					src="https://static.vecteezy.com/system/resources/previews/029/771/813/non_2x/epicgraphy-shot-of-rainy-season-background-enjoying-nature-rainfall-and-happy-life-concept-generative-ai-free-photo.jpeg"
					alt=""
				/>
			</div>
			<div className={home_css.workspace}>
				<h2>Your Workspace</h2>
				<div className={home_css.notesContainers}>
					<div className={home_css.notesContainer_left}>
						<h3>Your Notes</h3>
					</div>
					<div className={home_css.notesContainer_right}>
						<h3>Scratchpad</h3>
						<div className={home_css.scratchpad}>
							<textarea
								placeholder="Enter a note!"
								onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
									setNotes(event.target.value);
									localStorage.setItem(`notes#${user_id}`, event.target.value);
								}}
								value={notes}
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
