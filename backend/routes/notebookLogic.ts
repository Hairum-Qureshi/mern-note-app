import express from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
import Notebook from "../models/notebook";
import Notebook_Interface from "../interfaces";
import User_Interface from "../interfaces";
import User from "../models/user";

const router = express.Router();

async function findUser(user_id: string): Promise<User_Interface | null> {
	const user = await User.findOne({ _id: user_id });
	if (user) return user;
	else return null;
}

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

		const user: User_Interface | null = await findUser(user_id);
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

		res.send(notebook);
	} catch (error) {
		console.log(error);
	}
});

export default router;
