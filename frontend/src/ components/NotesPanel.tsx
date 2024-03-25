import { Link, useParams } from "react-router-dom";
import notes_css from "../css/notes_panel.module.css";
import useNotebookData from "../hooks/useNotebookData";
import useAuth from "../contexts/authContext";
import { Note_Interface } from "../interfaces";
import { faCheck, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import NoteView from "./NoteView";
import NotFound from "./NotFound";
import toast, { Toaster } from "react-hot-toast";
import useNotebookLogic from "../hooks/useNotebookLogic";

// TODO - need to add a character limit in terms of the notes in the boxes being displayed. If they're X amount of words/characters, replace the rest with "...".

export default function NotesPanel() {
	const { userData } = useAuth()!;
	const { createdNotes, createNote, getNotes, notebookNotes } =
		useNotebookData();
	const { getNotebook } = useNotebookLogic();
	const { user_id, notebook_id } = useParams();
	const [pressed, setPressed] = useState(false);
	const [currentNotebookName, setCurrentNotebookName] = useState<string>();
	const [notebookNotesCopy, setNotebookNotesCopy] = useState<Note_Interface[]>(
		[]
	);
	const [selectedNoteID, setSelectedNoteID] = useState<string>();
	const [noteContent, setNoteContent] = useState<string | undefined>();

	useEffect(() => {
		async function fetchData() {
			const notebookName: string | undefined = await getNotebook(notebook_id);
			setCurrentNotebookName(notebookName);
			getNotes(notebook_id);
		}
		fetchData();
	}, [notebook_id]);

	useEffect(() => {
		if (notebookNotes) {
			setNotebookNotesCopy([...notebookNotes]);
		}
	}, [notebookNotes]);

	useEffect(() => {
		// Check if a new note has been created
		if (createdNotes.length > notebookNotesCopy.length) {
			// If a new note has been created, fetch the updated notes
			getNotes(notebook_id);
		}
	}, [createdNotes, notebookNotesCopy, getNotes, notebook_id]);

	function updateNotebookNoteData(
		new_content: string,
		new_title: string,
		note_id: string,
		last_updated: string
	) {
		const updatedNotes = notebookNotesCopy.map((note: Note_Interface) => {
			if (note._id === note_id) {
				return {
					...note,
					content: new_content,
					title: new_title,
					timeEdited: last_updated
				};
			}
			return note;
		});
		setNotebookNotesCopy(updatedNotes);
	}

	function getNoteContent(note_id: string) {
		if (notebookNotesCopy) {
			const noteCollection: (Note_Interface | undefined)[] =
				notebookNotesCopy.filter((note: Note_Interface) => {
					if (note._id === note_id) {
						return note;
					}
				});

			if (noteCollection) {
				const content: string | undefined = noteCollection[0]?.content;
				setNoteContent(content);
			}
		}
	}

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
				{notebookNotesCopy &&
					notebookNotesCopy
						.slice()
						.reverse()
						.map((note: Note_Interface) => (
							<Link
								to={`/user/${user_id}/notebook/${notebook_id}/note/${note._id}`}
								key={note._id}
								onClick={() => {
									setSelectedNoteID(note._id);
									getNoteContent(note._id);
								}}
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
											.replace(note.title.replace(/(<([^>]+)>)/gi, ""), "")
											.replace("&nbsp;", "")
											.trim()}
									</p>
									<small>
										{note.timeEdited ? `Last updated ${note.timeEdited}` : ""}
									</small>
								</div>
							</Link>
						))}
			</div>
			{notebookNotes && notebookNotes.length === 0 ? (
				""
			) : (
				<NoteView
					updateNotebookNoteData={updateNotebookNoteData}
					selectedNoteID={selectedNoteID}
					noteContent={noteContent}
				/>
			)}
		</>
	) : (
		<NotFound />
	);
}
