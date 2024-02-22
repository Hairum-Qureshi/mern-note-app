import mongoose, { Document, Schema } from "mongoose";

export interface User_Interface {
	_id: string;
	email: string;
	name: string;
	password: string;
	profilePicture: string;
}

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
	}
});

const User = mongoose.model<UserModel>("User", UserSchema);
export default User;
