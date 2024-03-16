import express from "express";
import Notebook from "../models/notebook";
import User_Interface from "../interfaces";
import User from "../models/user";
import { getUser } from "./users";
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

		const user: User_Interface | null = await getUser(user_id);
		if (user) {
			await User.findByIdAndUpdate(
				{
					_id: user_id
				},
				{
					notebooksCount: user.notebooksCount + 1
				}
			);
		}
	} catch (error) {
		console.log(error);
	}
});

router.delete("/delete-notebook/:notebook_id/:user_id", async (req, res) => {
	const { notebook_id, user_id } = req.params;

	await Notebook.deleteOne({
		_id: notebook_id
	});

	const user: User_Interface | null = await getUser(user_id);
	if (user) {
		const notebookCount: number = user.notebooksCount;
		await User.findByIdAndUpdate(
			{
				_id: user_id
			},
			{
				notebooksCount: notebookCount - 1
			}
		);
	}

	res.send("Notebook successfully deleted!");
});

export default router;
