import { useEffect, useState, useRef, useMemo } from "react";
import viewer_css from "../css/note_viewer.module.css";
import useNotebookData from "../hooks/useNotebookData";
import { Note_Interface } from "../interfaces";
import { Editor } from "@tinymce/tinymce-react";
import useAuth from "../contexts/authContext";
import { useParams } from "react-router-dom";
import useNoteLogic from "../hooks/useNoteLogic";

export default function NoteView() {
	const { note_id, notebook_id, user_id } = useParams();
	const { getNoteData, noteContent } = useNotebookData();
	const { userData } = useAuth();
	const [noteData, setNoteData] = useState<Note_Interface[] | undefined>();
	const [editorContent, setEditorContent] = useState<string>();
	const [value, setValue] = useState<string>();
	const { autosaveContent } = useNoteLogic();

	// TODO: get rid of the "title" property in the note database -- it's not needed

	useEffect(() => {
		getNoteData(note_id); // gets the data of the note based on the note ID passed into it
		if (noteContent) setNoteData(noteContent);
	}, [note_id, noteData]);

	function showLiveChanges(
		note_id: string,
		editorContent: string,
		title: string
	) {
		const index: number = noteContent!.findIndex(noteObj => {
			return noteObj._id === note_id;
		});

		noteContent![index].content = editorContent;
		noteContent![index].title = title;
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
					setValue(newValue);
				}}
				initialValue={noteContent ? noteContent[0].content : ""}
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
