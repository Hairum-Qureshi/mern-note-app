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

export default router;
