import { useEffect, useState, useRef } from "react";
import axios from "axios";
import useAuth from "../contexts/authContext";
import { NoteLogicProperties } from "../interfaces";

export default function useNoteLogic(): NoteLogicProperties {
	function autosaveContent(note_id: string, editorContent: string) {
		console.log(editorContent);
	}

	return { autosaveContent };
}
