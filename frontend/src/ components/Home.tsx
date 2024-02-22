import { useState } from "react";
import home_css from "../css/home.module.css";
import useCurrentTime from "../hooks/useCurrentTime";
import { tailspin } from "ldrs";

tailspin.register();

export default function Home() {
	const user_name = "Hairum";
	const user_id = 123;

	const [notes, setNotes] = useState<string>(
		localStorage.getItem(`notes#${user_id}`)!
	);
	const { currentDate, currentTime, greeting } = useCurrentTime();

	return !currentDate && !currentTime && !greeting ? (
		// Default values shown
		<div className={home_css.contentContainer}>
			<div className={home_css.loadingContainer}>
				<l-tailspin size="60" stroke="5" speed="0.60" color="lime"></l-tailspin>
			</div>
		</div>
	) : (
		<div className={home_css.contentContainer}>
			<div className={home_css.subNavbar}>
				<img src="" alt="" />
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
