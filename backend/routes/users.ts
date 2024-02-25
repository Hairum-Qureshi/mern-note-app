import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
// import authFunctions from "../controllers/authController";
const router = express.Router();
import User from "../models/user";
import User_Interface from "../interfaces";

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
	const cookieToken = req.cookies;
	const decodedToken = jwt.decode(cookieToken["auth-token"]) as JwtPayload;
	if (decodedToken) {
		const user: User_Interface | null = await findUser(decodedToken.user_id);
		if (user) {
			const { name, email, _id: user_id, profilePicture } = user;
			res.json({ name, email, user_id, profilePicture });
		} else {
			res.send(null);
		}
	} else {
		res.send(null);
	}
});

export default router;
