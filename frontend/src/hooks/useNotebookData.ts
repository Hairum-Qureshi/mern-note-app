import axios from "axios";
import { useState } from "react";
import { NoteBookDataProperties, Note_Interface } from "../interfaces";

export default function useNotebookData(): NoteBookDataProperties {
	const [createdNotes, setCreatedNotes] = useState<Note_Interface[]>([]);
	const [noteContent, setNoteContent] = useState<Note_Interface[] | null>(null);
	const [notebookNotes, setNotebookNotes] = useState<Note_Interface[] | null>(
		[]
	);

	async function getNoteData(note_id: string | undefined) {
		if (note_id) {
			await axios
				.get(`http://localhost:4000/api/notes/get-note/${note_id}`)
				.then(response => {
					setNoteContent([response.data]);
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			console.log("note_id is undefined");
		}
	}

	async function getNotes(
		notebook_id: string | undefined
	): Promise<Note_Interface | undefined> {
		try {
			const response = await axios.get(
				`http://localhost:4000/api/notes/notebook/${notebook_id}`
			);

			console.log(response);

			return response.data;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	}

	async function getNotes(notebook_id: string | undefined) {
		console.log("(getNotes function) Notebook ID received:", notebook_id);
		try {
			const response = await axios.get(
				`http://localhost:4000/api/notes/notebook/${notebook_id}`
			);
			setNotebookNotes(response.data);
		} catch (error) {
			console.log(error);
		}
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
			setCreatedNotes(prevNoteData => [...prevNoteData, response.data]);
		} catch (error) {
			console.log("There was an error", error);
		}
	}
	return {
		createdNotes,
		createNote,
		getNoteData,
		noteContent,
		getNotes,
		notebookNotes
	};
}
