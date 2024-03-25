import { useEffect, useState } from "react";
import viewer_css from "../css/note_viewer.module.css";
import useNotebookData from "../hooks/useNotebookData";
import { Note_Interface } from "../interfaces";
import { Editor } from "@tinymce/tinymce-react";
import useAuth from "../contexts/authContext";
import { useParams } from "react-router-dom";
import useNoteLogic from "../hooks/useNoteLogic";

interface Props {
	updateNotebookNoteData: (
		new_content: string,
		new_title: string,
		note_id: string
	) => void;
	selectedNoteID: string | undefined;
	noteContent: string | undefined;
}

export default function NoteView({
	updateNotebookNoteData,
	selectedNoteID,
	noteContent: note_content
}: Props) {
	const { note_id, notebook_id } = useParams();
	const { getNoteData, noteContent, getNotes, notebookNotes } =
		useNotebookData();
	const { userData } = useAuth()!;
	const [noteData, setNoteData] = useState<Note_Interface[] | undefined>();
	const [editorContent, setEditorContent] = useState<string>();
	// const [value, setValue] = useState<string>();
	const { autosaveContent } = useNoteLogic();
	const [test, setTest] = useState<string>();

	// TODO - change the method in which the notes are saved because you always have to click out of the textarea and that can be cumbersome

	// TODO - For each note, add a "isDeleted" property. You could use that to filter out all notes that are deleted and display them in the "deleted notes" tab. That way, when a user wants to recover a note, they can undo said property and it won't show in the deleted notes tab.

	useEffect(() => {
		getNotes(notebook_id);

		setNoteData(noteContent!);
	}, [noteData, selectedNoteID]);

	useEffect(() => {
		getNoteData(selectedNoteID); // gets the data of the note based on the note ID passed into it
	}, [selectedNoteID, note_content]);

	function showLiveChanges(
		note_id: string,
		editorContent: string,
		title: string
	) {
		if (notebookNotes) {
			const updatedNotes = [...notebookNotes];
			const noteIndex: number = updatedNotes.findIndex(
				note => note._id === note_id
			);
			if (notebookNotes && noteIndex !== -1) {
				updatedNotes[noteIndex] = {
					...updatedNotes[noteIndex],
					content: editorContent,
					title: title
				};

				updateNotebookNoteData(editorContent, title, note_id);
				setNoteData([updatedNotes[noteIndex]]);
				console.log(updatedNotes[noteIndex].content);
			}
		}
	}

	return (
		<div className={viewer_css.block}>
			<Editor
				onBlur={() => {
					autosaveContent(
						note_id!,
						editorContent!,
						editorContent!
							.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i)?.[1]
							?.split(/\r?\n/)[0]
							?.trim() ?? "Untitled"
					);
					showLiveChanges(
						note_id!,
						editorContent!,
						editorContent!
							.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i)?.[1]
							?.split(/\r?\n/)[0]
							?.trim() ?? "Untitled"
					);
				}}
				apiKey="w7sjc38sud70tb0pse4oswh03h6c1pmth6o10a3vp7z35sbc"
				onEditorChange={(newValue, editor) => {
					setEditorContent(editor.getContent({ format: "html" }));
					// setValue(newValue);
				}}
				initialValue={note_content ? note_content : ""}
				init={{
					plugins:
						"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
					toolbar:
						"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
					tinycomments_mode: "embedded",
					tinycomments_author: userData && userData.name,
					mergetags_list: [
						{ value: "First.Name", title: "First Name" },
						{ value: "Email", title: "Email" }
					],
					branding: false,
					content_style: `
                        * {
                            background: white;                            
                        }
                    `
				}}
			/>
		</div>
	);
}
