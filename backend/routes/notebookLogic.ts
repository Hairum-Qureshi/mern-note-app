import express from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import User from "../models/user";
import Notebook from "../models/notebook";
import Notebook_Interface from "../interfaces";
import User_Interface from "../interfaces";

const router = express.Router();

router.patch("/update", async (req, res) => {
	// All request URLs have a prefix of "/api/notebook" *****
	const { notebookName, user_id, notebook_id } = req.body;
	await Notebook.findByIdAndUpdate(
		{
			_id: notebook_id
		},
		{
			notebookName
		}
	);
});

router.post("/create", async (req, res) => {
	// All request URLs have a prefix of "/api/notebook" *****
	// .trim() does not seem to be working for some reason
	const { notebookName, user_id, username, currentDate } = req.body;
	try {
		const notebook = await Notebook.create({
			author: username,
			dateCreated: currentDate,
			user_id,
			notebookName
		});
		notebook.save();
		res.send(notebook);
	} catch (error) {
		console.log(error);
	}
});

export default router;
