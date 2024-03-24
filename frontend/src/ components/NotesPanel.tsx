import { Link, useParams } from "react-router-dom";
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
import toast, { Toaster } from "react-hot-toast";

// TODO: need to make the "share notes" link button work.

// TODO: note blocks all fire a "Double clicked!" alert message when you double click. Implement feature to prompt user asking if they'd like to delete the note if double clicked

export default function NotesPanel() {
	const { userData } = useAuth()!;
	const { createdNotes, createNote, getNotes, notebookNotes } =
		useNotebookData();
	const { user_id, notebook_id } = useParams();
	const [pressed, setPressed] = useState(false);
	const { getNotebook } = useNotebookLogic();
	const [currentNotebookName, setCurrentNotebookName] = useState<string>();

	useEffect(() => {
		getNotes(notebook_id);

		async function getNoteData() {
			const notebookName: string | undefined = await getNotebook(notebook_id);
			setCurrentNotebookName(notebookName);
		}

		getNoteData();
	}, [createdNotes, notebookNotes]);

	return userData.message !== "user not found" ? (
		<>
			<Toaster />
			<div className={notes_css.panel}>
				<h3>
					{currentNotebookName ? `${currentNotebookName} > Notes` : "Notes"}
				</h3>
				<span
					onClick={() => {
						setPressed(true);
						return toast("Shareable link copied!", {
							icon: "🔗",
							style: {
								borderRadius: "10px",
								background: "#076315",
								color: "#fff"
							}
						});
					}}
				>
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
					notebookNotes
						.slice()
						.reverse()
						.map((note: Note_Interface) => (
							<Link
								to={`/user/${user_id}/notebook/${notebook_id}/note/${note._id}`}
								key={note._id}
								onDoubleClick={() => alert("Double clicked!")}
							>
								<div className={notes_css.block}>
									<h3>
										{note.title
											.replace(/(<([^>]+)>)/gi, "")
											.replace("&nbsp;", "")}
									</h3>
									<p>
										{note.content
											.replace(/<[^>]+>/g, "")
											// Replace the first header with an empty string if it exists
											.replace(note.title.replace(/(<([^>]+)>)/gi, ""), "")
											.replace("&nbsp;", "")
											.trim()}
									</p>
									<small>{note.timeEdited.replace(/(<([^>]+)>)/gi, "")}</small>
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
