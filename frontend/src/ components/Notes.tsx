import { useEffect, useState } from "react";
import useAuth from "../contexts/authContext";
import NotesPanel from "./NotesPanel";
import Navbar from "./Navbar";

export default function Notes() {
	const { userData } = useAuth()!;

	return (
		<>
			<Navbar />
			{userData ? <NotesPanel /> : ""}
		</>
	);
}
