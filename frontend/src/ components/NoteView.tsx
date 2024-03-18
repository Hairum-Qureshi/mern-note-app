import { useEffect, useState, useRef, useMemo } from "react";
import viewer_css from "../css/note_viewer.module.css";
import useNotebookData from "../hooks/useNotebookData";
import { NoteView_Props, Note_Interface } from "../interfaces";
import { Editor } from "@tinymce/tinymce-react";
import useAuth from "../contexts/authContext";

export default function NoteView({
	noteID,
	notebookID,
	userID
}: NoteView_Props) {
	const { getNoteData, noteContent } = useNotebookData();
	const { userData } = useAuth();
	const [noteData, setNoteData] = useState<Note_Interface[] | undefined>();
	const [editorContent, setEditorContent] = useState<string>();
	const [value, setValue] = useState<string>();

	// May need to store current ID of the note selected so that way, when the user enters the URL with that note ID, it will open up to that note and display that note's contents.

	useEffect(() => {
		getNoteData(noteID);
		if (noteContent) setNoteData(noteContent);
	}, [noteID, noteData]);

	function autosaveContent(editorContent: string) {
		console.log(editorContent);
	}

	return (
		<div className={viewer_css.block}>
			<Editor
				onChange={() => autosaveContent(editorContent!)}
				apiKey="w7sjc38sud70tb0pse4oswh03h6c1pmth6o10a3vp7z35sbc"
				onEditorChange={(newValue, editor) => {
					setEditorContent(editor.getContent({ format: "text" }));
					setValue(newValue);
				}}
				initialValue={`${
					noteContent === null
						? ""
						: noteContent &&
						  `<h3>${noteContent[0].title}</h3><p>${noteContent[0].content} <br /> ${noteContent[0]._id}</p>`
				}`}
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
