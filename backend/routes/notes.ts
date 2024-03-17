import express, { Request } from "express";
import User_Interface, { Notebook_Interface } from "../interfaces";
const router = express.Router();
import { getUser } from "./users";
import Note from "../models/note";
import User from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import Notebook from "../models/notebook";

export async function getNotebookName(
	notebook_id: string
): Promise<string | undefined> {
	try {
		if (notebook_id) {
			const notebook = await Notebook.findOne({ _id: notebook_id });
			return notebook?.notebookName;
		} else {
			return undefined;
		}
	} catch (error) {
		console.error("Error finding notebook:", error);
		return undefined;
	}
}

async function getCurrUID(req: Request): Promise<JwtPayload> {
	const cookieToken = req.cookies;
	const decodedToken = jwt.decode(cookieToken["auth-token"]) as JwtPayload;
	return decodedToken;
}

router.get("/get-note/:note_id", async (req, res) => {
	// ** ALL ROUTES HAVE THE PREFIX /api/notes/ ** //
	const { note_id } = req.params;
	const curr_uid = await getCurrUID(req);
	try {
		// if (curr_uid && curr_uid.user_id) {
		const note = await Note.find({
			_id: note_id
		});
		res.json(note);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.post("/create-note", async (req, res) => {
	const { user_id, notebook_id } = req.body;
	try {
		const user: User_Interface | null = await getUser(user_id);
		const notebookName = await getNotebookName(notebook_id);
		if (user) {
			const note = await Note.create({
				content: "",
				user_id,
				author: user.name,
				datePosted: new Date().toLocaleDateString("en-US"),
				timeEdited: "",
				notebookID: notebook_id || "N/A",
				notebookName: notebookName
			});
			note.save();

			res.send(note);
		}
	} catch (error) {
		console.log(error);
	}
});

export default router;
