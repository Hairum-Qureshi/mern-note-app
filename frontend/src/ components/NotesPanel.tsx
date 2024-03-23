import { Link, useNavigate, useParams } from "react-router-dom";
import notes_css from "../css/notes_panel.module.css";
import useNotebookData from "../hooks/useNotebookData";
import useAuth from "../contexts/authContext";
import { Note_Interface } from "../interfaces";
import { faCheck, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import NoteView from "./NoteView";
import useNotebookLogic from "../hooks/useNotebookLogic";
import NotFound from "./NotFound";

export default function NotesPanel() {
	const { userData } = useAuth()!;
	const { createdNotes, createNote, getNotes, notebookNotes } =
		useNotebookData();
	const { user_id, notebook_id } = useParams();
	const [selectedNoteID, setSelectedNoteID] = useState<string | undefined>();
	const [pressed, setPressed] = useState(false);
	const { getNotebook } = useNotebookLogic();
	const [currentNotebookName, setCurrentNotebookName] = useState<string>();
	const [allNotes, setAllNotes] = useState<Note_Interface[] | null>();

	useEffect(() => {
		getNotes(notebook_id);
		// setAllNotes(notebookNotes);

		async function getNoteData() {
			const notebookName: string | undefined = await getNotebook(notebook_id);
			setCurrentNotebookName(notebookName);
		}

		getNoteData();
	}, [createdNotes]);

	return userData.message !== "user not found" ? (
		<>
			<div className={notes_css.panel}>
				<h3>
					{currentNotebookName ? `${currentNotebookName} > Notes` : "Notes"}
				</h3>
				<span onClick={() => setPressed(true)}>
					{pressed ? (
						<FontAwesomeIcon icon={faCheck} />
					) : (
						<FontAwesomeIcon icon={faLink} />
					)}
				</span>
				<button
					onClick={() => {
						createNote(userData && userData.user_id, notebook_id || "");
					}}
				>
					Create Note
				</button>
				{notebookNotes &&
					notebookNotes.slice().reverse().map((note: Note_Interface) => (
						<Link
							to={`/user/${user_id}/notebook/${notebook_id}/note/${note._id}`}
							key={note._id}
							onClick={() => setSelectedNoteID(note._id)}
						>
							<div className={notes_css.block}>
								<h3>{note.title}</h3>
								<p>{note.content}</p>
								<small>{note.timeEdited}</small>
							</div>
						</Link>
					))}
			</div>
			{notebookNotes && notebookNotes.length === 0 ? "" : <NoteView />}
		</>
	) : (
		<NotFound />
	);
}
