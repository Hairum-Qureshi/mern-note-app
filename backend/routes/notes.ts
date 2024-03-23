import express, { Request } from "express";
import User_Interface from "../interfaces";
const router = express.Router();
import { getUser } from "./users";
import Note from "../models/note";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getNotebookName } from "./notebookLogic";
import mongoose from "mongoose";

async function getCurrUID(req: Request): Promise<JwtPayload> {
	const cookieToken = req.cookies;
	const decodedToken = jwt.decode(cookieToken["auth-token"]) as JwtPayload;
	return decodedToken;
}

router.get("/notebook/:notebook_id", async (req, res) => {
	// ** ALL ROUTES HAVE THE PREFIX /api/notes/ ** //
	const { notebook_id } = req.params;
	const currUID = await getCurrUID(req);
	if (!currUID) {
		// Check if currUID and currUID.user_id exist
		// const user: User_Interface | null = await getUser(currUID.user_id);
		// if (user) {
		Note.find({ notebookID: notebook_id })
			.then(notes => {
				res.json(notes);
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({ message: "Internal Server Error" });
			});
		// } else {
		// 	res.json({ message: "user not found/isn't signed in" });
		// }
	} else {
		res.json({ message: "user not found/isn't signed in" });
	}
});

router.get("/get-note/:note_id", async (req, res) => {
	// ** ALL ROUTES HAVE THE PREFIX /api/notes/ ** //
	const { note_id } = req.params;
	try {
		if (note_id) {
			if (!mongoose.Types.ObjectId.isValid(note_id)) {
				return res.status(400).json({ error: "Invalid note_id format" });
			}
			const objectId = new mongoose.Types.ObjectId(note_id);
			try {
				const note = await Note.findById(objectId);
				if (!note) {
					return res.status(404).json({ error: "Note not found" });
				}
				res.send(note);
			} catch (err) {
				console.error(err);
				res.status(500).send("Internal Server Error");
			}
		} else {
			return res.status(400).json({ error: "Missing note_id" });
		}
	} catch (error) {
		console.error("Error finding notebook:", error);
		res.send(error);
	}
});

router.post("/create-note", async (req, res) => {
	// ** ALL ROUTES HAVE THE PREFIX /api/notes/ ** //

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

router.patch("/note/:note_id/update", (req, res) => {
	// ** ALL ROUTES HAVE THE PREFIX /api/notes/ ** //
	const { note_id } = req.params;
	const { note_content } = req.body;
});

export default router;
