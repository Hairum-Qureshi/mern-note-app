import express from "express";
import Notebook from "../models/notebook";
import User_Interface from "../interfaces";
import User from "../models/user";
import { getUser } from "./users";
import { Types } from "mongoose";
const router = express.Router();

export async function getNotebookName(
	notebook_id: string
): Promise<string | undefined> {
	try {
		if (Types.ObjectId.isValid(notebook_id)) {
			const notebook = await Notebook.findOne({ _id: notebook_id });
			return notebook?.notebookName;
		} else {
			// console.error(
			// 	"<NotebookLogic.ts [17]> Invalid notebook ID format:",
			// 	notebook_id
			// );
			return undefined;
		}
	} catch (error) {
		console.error("Error finding user:", error);
		return undefined;
	}
}

router.get("/:notebook_id", async (req, res) => {
	// All request URLs have a prefix of "/api/notebook" *****
	const { notebook_id } = req.params;
	const notebook: string | undefined = await getNotebookName(notebook_id);
	res.send(notebook);
});

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
