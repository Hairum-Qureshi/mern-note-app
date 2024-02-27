import { Request, Response } from "express";
import User from "../models/user";
import User_Interface from "../interfaces";
import Notebook from "../models/notebook";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestBody, AuthHandlers } from "../interfaces";

function generateSecret(length: number): string {
	const characters =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let secret = "";

	for (let i = 0; i < length; i++) {
		const randomIndex: number = Math.floor(Math.random() * characters.length);
		secret += characters.charAt(randomIndex);
	}

	return secret;
}

const MAX_AGE = 7 * 24 * 60 * 60; // 7 days

function createToken(user_id: string): string {
	const secret: string = generateSecret(64);
	return jwt.sign({ user_id }, secret, {
		expiresIn: MAX_AGE
	});
}

async function findUser(
	email: string,
	password?: string
): Promise<User_Interface | null> {
	try {
		if (email) {
			const user = await User.findOne({ email });
			return user;
		}
		if (password) {
			const user = await User.findOne({ password });
			return user;
		}
	} catch (error) {
		console.error("Error finding user:", error);
		return null;
	}

	return null;
}

const signUp = async (req: Request, res: Response) => {
	const { email, name, password }: RequestBody = req.body;
	const hashedPassword: string = await bcrypt.hash(password, 10);
	const user = await findUser(email);
	if (user) {
		res.status(500).send({
			message: "An account already exists with this email"
		});
	} else {
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword
		});

		const newNotebook = await Notebook.create({
			author: name,
			dateCreated: new Date().toLocaleDateString("en-US"),
			user_id: newUser._id,
			timeEdited: "---"
		});

		newUser.save();
		newNotebook.save();

		const token: string = createToken(newUser._id);
		res.cookie("auth-token", token, {
			httpOnly: true,
			maxAge: MAX_AGE * 1000
		});
		res.status(200).send({
			message: "Account successfully created!"
		});
	}
};

const signIn = async (req: Request, res: Response) => {
	const { email, password }: RequestBody = req.body;
	const user = await findUser(email);
	if (user) {
		const hashedResult: boolean = await bcrypt.compare(password, user.password);
		if (hashedResult) {
			const token: string = createToken(user._id);
			res.cookie("auth-token", token, {
				httpOnly: true,
				maxAge: MAX_AGE * 1000
			});
			res.status(200).send({ message: "Successfully logged in!" });
		} else {
			res.status(500).send({ message: "Incorrect password" });
		}
	} else {
		res
			.status(404)
			.send({ message: "There is no account associated with this email" });
	}
};

const signOut = (req: Request, res: Response) => {
	const options = { maxAge: -1, httpOnly: true };
	res.cookie("auth-token", "", options);
	res
		.status(200)
		.json({ message: "Successfully logged out!", token: req.cookies });
};

const authFunctions: AuthHandlers = {
	signUp,
	signIn,
	signOut
};

export default authFunctions;
