import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import User_Interface from "../interfaces";
import Notebook from "../models/notebook";
import Notebook_Interface from "../interfaces";

const router = express.Router();

async function findUser(user_id: string): Promise<User_Interface | null> {
	try {
		if (user_id) {
			const user = await User.findOne({ _id: user_id });
			return user;
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error finding user:", error);
		return null;
	}
}

router.get("/currentUser", async (req, res) => {
	// Don't forget to add the route /api before!
	const cookieToken = req.cookies;
	const decodedToken = jwt.decode(cookieToken["auth-token"]) as JwtPayload;
	if (decodedToken) {
		const user: User_Interface | null = await findUser(decodedToken.user_id);
		if (user) {
			const {
				name,
				email,
				_id: user_id,
				profilePicture,
				notesCount,
				notebooksCount
			} = user;
			res.json({
				name,
				email,
				user_id,
				profilePicture,
				notesCount,
				notebooksCount
			});
		} else {
			res.send(null);
		}
	} else {
		res.json({ message: "user not found" });
	}
});

router.get("/currentUser/notebooks/:user_id", async (req, res) => {
	// Don't forget to add the route /api before!
	const { user_id } = req.params;
	const user: User_Interface | null = await findUser(user_id);
	if (user) {
		const { name } = user;
		Notebook.find({ author: name }) // Assuming the field in Notebook model is "author". This line queries the Notebook model to find all notebooks where the author field matches the name of the user.
			.populate("_id")
			.then(notebooks => {
				res.json(notebooks);
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
