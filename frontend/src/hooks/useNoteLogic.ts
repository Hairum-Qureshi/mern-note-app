// import { useEffect, useState } from "react";
import axios from "axios";
import { NoteLogicProperties } from "../interfaces";

export default function useNoteLogic(): NoteLogicProperties {
	function autosaveContent(note_id: string, editorContent: string) {
		axios.patch(
			`http://localhost:4000/api/notes/note/${note_id}/update`,
			{
				note_content: editorContent
			},
			{
				withCredentials: true
			}
		);
	}

	return { autosaveContent };
}
