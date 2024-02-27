import mongoose, { Document, Schema } from "mongoose";
import User_Interface from "../interfaces";

export interface UserModel extends User_Interface, Document {
	_id: string;
}

const UserSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profilePicture: {
		type: String,
		default:
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
	},
	notesCount: {
		type: Number,
		default: 0
	},
	notebooksCount: {
		type: Number,
		default: 1
	}
});

const User = mongoose.model<UserModel>("User", UserSchema);
export default User;
