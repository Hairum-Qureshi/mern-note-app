import { Link, useNavigate, useParams } from "react-router-dom";
import notes_css from "../css/notes_panel.module.css";
import useNotebookData from "../hooks/useNotebookData";
import useAuth from "../contexts/authContext";
import { Note_Interface } from "../interfaces";

export default function NotesPanel() {
	const { userData } = useAuth()!;
	const { noteData, createNote } = useNotebookData();
	const { user_id, notebook_id } = useParams();
	return (
		<div className={notes_css.panel}>
			<h3>Notebook Title &gt; Notes</h3>
			<button
				onClick={() => {
					createNote(userData && userData.user_id, notebook_id || "");
				}}
			>
				Create Note
			</button>
			{noteData &&
				noteData.map((note: Note_Interface) => (
					<Link
						to={`/user/${user_id}/notebook/${notebook_id}/note/${note._id}`}
					>
						<div className={notes_css.block} key={note._id}>
							<h3>{note.title}</h3>
							<p>{note.content}</p>
							<small>{note.timeEdited}</small>
						</div>
					</Link>
				))}
		</div>
	);
}
