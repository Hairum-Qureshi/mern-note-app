import { useState, useEffect } from "react";
import TimeState from "../../src/interfaces";

export default function useCurrentTime(): TimeState {
	const [currentDate, setCurrentDate] = useState("");
	const [currentTime, setCurrentTime] = useState("");
	const [greeting, setGreeting] = useState("");

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	const weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	useEffect(() => {
		const timeInterval = setInterval(() => {
			const date = new Date();
			const day = date.getDate();
			const nth = (d: number): string => {
				if (d > 3 && d < 21) return "th";
				switch (d % 10) {
					case 1:
						return "st";
					case 2:
						return "nd";
					case 3:
						return "rd";
					default:
						return "th";
				}
			};
			const weekDay = weekDays[date.getDay()];
			const year = date.getFullYear();
			const month = months[date.getMonth()];

			const formattedDate = `${weekDay}, ${month} ${day}${nth(day)}, ${year}`;
			setCurrentDate(formattedDate);

			const hours: string =
				date.getHours() % 12 === 0
					? "12"
					: date.getHours() % 12 < 10
					? `0${date.getHours() % 12}`
					: (date.getHours() % 12).toString();
			const minutes: string =
				date.getMinutes() < 10
					? `0${date.getMinutes()}`
					: date.getMinutes().toString();

			const AM_PM = date.getHours() < 12 ? "AM" : "PM";
			const greeting =
				date.getHours() < 12
					? "Good morning"
					: date.getHours() >= 12 && date.getHours() <= 16
					? "Good afternoon"
					: "Good evening";

			setCurrentTime(`${hours}:${minutes} ${AM_PM}`);
			setGreeting(greeting);
		}, 1000);

		// Clear the interval when the component unmounts
		return () => clearInterval(timeInterval);
	}, []);

	return { currentDate, currentTime, greeting };
}
