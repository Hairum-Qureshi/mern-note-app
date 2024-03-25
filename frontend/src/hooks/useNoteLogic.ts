// import { useEffect, useState } from "react";
import axios from "axios";
import { NoteLogicProperties } from "../interfaces";

export default function useNoteLogic(): NoteLogicProperties {
	function autosaveContent(
		note_id: string,
		editorContent: string,
		title: string,
		last_updated: string
	) {
		console.log(last_updated);
		axios.patch(
			`http://localhost:4000/api/notes/note/${note_id}/update`,
			{
				note_content: editorContent,
				title,
				last_updated
			},
			{
				withCredentials: true
			}
		);
	}

	return { autosaveContent };
}
