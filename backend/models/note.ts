import mongoose, { Document, Schema } from "mongoose";
import Note_Interface from "../interfaces";

export interface NoteModel extends Note_Interface, Document {
	_id: string;
}

const NoteSchema: Schema = new Schema({
	content: {
		type: String
	},
	title: {
		type: String,
		default: "Untitled"
	},
	user_id: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true,
		ref: "User"
	},
	datePosted: {
		type: String
	},
	timeEdited: {
		type: String
	},
	notebookID: {
		type: String,
		ref: "Notebook"
	},
	notebookName: {
		type: String,
		ref: "Notebook"
	}
});

const Note = mongoose.model<NoteModel>("Note", NoteSchema);
export default Note;
