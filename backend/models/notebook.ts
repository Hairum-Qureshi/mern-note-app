import mongoose, { Document, Schema } from "mongoose";
import Notebook_Interface from "../interfaces";

export interface NotebookModel extends Notebook_Interface, Document {
	_id: string;
}

const NotebookSchema: Schema = new Schema({
	author: {
		type: String,
		required: true,
		ref: "User"
	},
	dateCreated: {
		type: String
	},
	timeEdited: {
		type: String
	},
	user_id: {
		type: String,
		unique: true
	},
	notebookName: {
		type: String,
		default: "First Notebook",
		required: true
	}
});

const Notebook = mongoose.model<NotebookModel>("Notebook", NotebookSchema);
export default Notebook;
