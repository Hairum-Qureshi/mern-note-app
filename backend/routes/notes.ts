import express from "express";
import User_Interface from "../interfaces";
const router = express.Router();
import { getUser } from "./users";
import Note from "../models/note";
import User from "../models/user";

router.get("/notebook/:notebook_id/:user_id", async (req, res) => {
	// ** ALL ROUTES HAVE THE PREFIX /api/notes/ ** //
	const { notebook_id, user_id } = req.params;
	const user: User_Interface | null = await getUser(user_id);
	if (user) {
		const { name } = user;
		Note.find({ notebook_id })
			.populate("notebook_id")
			.then(notes => {
				res.json(notes);
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({ message: "Internal Server Error" });
			});
	} else {
		res.json({ message: "user not found" });
	}
});

router.post("/create-note", async (req, res) => {
	const { user_id, notebook_id } = req.body;
	try {
		const user: User_Interface | null = await getUser(user_id);
		if (user) {
			const note = await Note.create({
				content: "",
				user_id,
				author: user.name,
				datePosted: new Date().toLocaleDateString("en-US"),
				timeEdited: "",
				notebookID: notebook_id || "N/A"
			});
			note.save();

			res.send(note);
		}
	} catch (error) {
		console.log(error);
	}
});

export default router;
