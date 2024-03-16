import { useEffect, useState } from "react";
import useAuth from "../contexts/authContext";
import NotesPanel from "./NotesPanel";
import NotFound from "./NotFound";

export default function UserNotes() {
	const { userData } = useAuth()!;

	return <>{userData ? <NotesPanel /> : ""}</>;
}
