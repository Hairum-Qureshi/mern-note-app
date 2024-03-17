import axios from "axios";
import { useState } from "react";
import { NoteBookDataProperties, Note_Interface } from "../interfaces";

export default function useNotebookData(): NoteBookDataProperties {
	const [createdNotes, setCreatedNotes] = useState<Note_Interface[]>([]);
	const [noteContent, setNoteContent] = useState<
		Note_Interface[] | undefined
	>();

	async function getNoteData(note_id: string | undefined) {
		await axios
			.get(`http://localhost:4000/api/notes/get-note/${note_id}`)
			.then(response => {
				setNoteContent(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	// async function getNotes(
	// 	user_id: string | undefined,
	// 	notebook_id: string | undefined
	// ) {
	// 	await axios
	// 		.get(`http://localhost:4000/api/notes/notebook/${notebook_id}/${user_id}`)
	// 		.then(response => {
	// 			console.log(response.data);
	// 		})
	// 		.catch(error => {
	// 			console.log("There was an error", error);
	// 		});
	// }

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
	return { createdNotes, createNote, getNoteData, noteContent };
}
