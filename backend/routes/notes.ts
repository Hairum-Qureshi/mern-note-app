import express from "express";
import User_Interface from "../interfaces";
const router = express.Router();
import { getUser } from "./users";
import Note from "../models/note";

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

export default router;
