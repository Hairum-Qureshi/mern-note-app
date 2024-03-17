import { useEffect, useState, useRef, useMemo } from "react";
import viewer_css from "../css/note_viewer.module.css";
import useNotebookData from "../hooks/useNotebookData";
import { Note_Interface } from "../interfaces";
import { Editor } from "@tinymce/tinymce-react";
import useAuth from "../contexts/authContext";

interface Props {
	noteID: string | undefined;
	notebookID: string | undefined;
	userID: string | undefined;
}

export default function NoteView({ noteID, notebookID, userID }: Props) {
	const { getNoteData, noteContent } = useNotebookData();
	const { userData } = useAuth();
	const [noteData, setNoteData] = useState<Note_Interface[] | undefined>();
	// const editor = useRef(null);
	const [editorContent, setEditorContent] = useState<string>();
	const [value, setValue] = useState<string>();

	useEffect(() => {
		getNoteData(noteID);
		setNoteData(noteContent);
	}, [noteID]);

	return (
		// <div className={viewer_css.block}>
		// 	<p>{JSON.stringify(noteData && noteData[0])}</p>
		// </div>
		<div className={viewer_css.block}>
			<Editor
				apiKey="w7sjc38sud70tb0pse4oswh03h6c1pmth6o10a3vp7z35sbc"
				onEditorChange={(newValue, editor) => {
					setEditorContent(editor.getContent({ format: "text" }));
					setValue(newValue);
				}}
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
					content_css: "../css/note_viewer.module.css"
				}}
			/>
		</div>
	);
}
