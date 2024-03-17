import { useEffect, useState } from "react";
import viewer_css from "../css/note_viewer.module.css";
import useNotebookData from "../hooks/useNotebookData";
import { Note_Interface } from "../interfaces";

// define your extension array

interface Props {
	noteID: string | undefined;
	notebookID: string | undefined;
	userID: string | undefined;
}

export default function NoteView({ noteID, notebookID, userID }: Props) {
	const { getNoteData, noteContent } = useNotebookData();
	const [noteData, setNoteData] = useState<Note_Interface[] | undefined>();

	useEffect(() => {
		getNoteData(noteID);
		setNoteData(noteContent);
	}, [noteID]);

	return (
		<div className={viewer_css.block}>
			<p>{JSON.stringify(noteData)}</p>
		</div>
	);
}
