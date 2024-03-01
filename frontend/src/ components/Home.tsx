import { useEffect, useState } from "react";
import home_css from "../css/home.module.css";
import useCurrentTime from "../hooks/useCurrentTime";
import { tailspin } from "ldrs";
import useAuth from "../contexts/authContext";
import NotFound from "./NotFound";
import { User } from "../interfaces";

tailspin.register();

export default function Home() {
	const { userData, notebookData } = useAuth()!;
	const [user, setUser] = useState<User>();
	const [notes, setNotes] = useState<string>();

	useEffect(() => {
		if (userData) {
			setUser(userData);
			setNotes(localStorage.getItem(`notes#${userData!.user_id}`)!);
		}
	}, [userData]);

	const { currentDate, currentTime, greeting } = useCurrentTime();
	return !user || user.message === "user not found" ? (
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
				<img src={user.profilePicture} alt="User profile picture" />
				<span>
					{greeting}, {user.name}!
				</span>
				<span>
					{currentDate} | {currentTime}
				</span>
			</div>
			<div className={home_css.background}>
				<button>CHANGE</button>
				<img
					src="https://static.vecteezy.com/system/resources/previews/029/771/813/non_2x/epicgraphy-shot-of-rainy-season-background-enjoying-nature-rainfall-and-happy-life-concept-generative-ai-free-photo.jpeg"
					alt="Background picture"
				/>
			</div>
			<div className={home_css.workspace}>
				<h2>Your Workspace</h2>
				<div className={home_css.notesContainers}>
					<div className={home_css.notesContainer_left}>
						<h3>Your Notes</h3>
						<div className={home_css.manageNotesContainer}>
							{user.notesCount! <= 0 ? (
								<>
									<h3>You currently don't have any notes.</h3>
									<button>Create a new note!</button>
								</>
							) : (
								<div>Notes...</div>
							)}
						</div>
					</div>
					<div className={home_css.notesContainer_right}>
						<h3>Scratchpad</h3>
						<div className={home_css.scratchpad}>
							<textarea
								placeholder="Enter a note!"
								onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
									setNotes(event.target.value);
									localStorage.setItem(
										`notes#${user.user_id}`,
										event.target.value
									);
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
