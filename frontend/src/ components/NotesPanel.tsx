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

	// TODO: need to create a function in the useNotebookData hook to retrieve all the notes for the specific notebook the user is in. When the page refreshes, noteData will be undefined which is fine, which is why we'll need to add a check to see if noteData is undefined, map over the array containing all the notes. Otherwise, just loop over noteData which would just appends the notes without a page refresh and "behind the scenes" add them to the database; that way, upon refresh, it'll display all the notes created. Only concern really is, if the user presses the create button, would it remove the notes being rendered from the "display all notes" array and simply display the 1 note the user had created after pressing the button and increment from there?

	useEffect(() => {
		async function getNoteData() {
			const notebookName: string | undefined = await getNotebook(notebook_id);
			// const notes: Note_Interface[] | null = await getNotes(notebook_id);
			setCurrentNotebookName(notebookName);
			setAllNotes(notebookNotes);
			getNotes(notebook_id);
			setAllNotes(notebookNotes);
			console.log(allNotes);
		}
		getNoteData();
	}, []);

	return (
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
				{createdNotes &&
					createdNotes.map((note: Note_Interface) => (
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
			<NoteView
				noteID={selectedNoteID}
				notebookID={notebook_id}
				userID={userData.user_id}
			/>
		</>
	);
}
