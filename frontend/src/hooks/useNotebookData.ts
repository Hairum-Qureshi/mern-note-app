import axios from "axios";
import { useState } from "react";
import { NoteBookDataProperties, Note_Interface } from "../interfaces";
import { useNavigate } from "react-router-dom";

export default function useNotebookData(): NoteBookDataProperties {
	const [noteData, setNoteData] = useState<Note_Interface[]>([]);
	const navigate = useNavigate();

	// Implement the function below:
	async function getNotes(user_id: string, notebook_id: string) {
		await axios
			.get(`http://localhost:4000/api/notes/notebook/${notebook_id}/${user_id}`)
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log("There was an error", error);
			});
	}

	async function createNote(user_id: string, notebook_id: string) {
		try {
			const response = await axios.post(
				"http://localhost:4000/api/notes/create-note",
				{
					user_id,
					notebook_id
				}
			);
			setNoteData(prevNoteData => [...prevNoteData, response.data]);
			// navigate(`${window.location.pathname}/note/${response.data._id}`);
		} catch (error) {
			console.log("There was an error", error);
		}
	}
	return { noteData, createNote };
}
