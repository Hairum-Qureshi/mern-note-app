import { Request, Response } from "express";

export default interface User_Interface {
	_id: string;
	email: string;
	name: string;
	password: string;
	profilePicture: string;
}

export interface RequestBody {
	email: string;
	name?: string; // optional
	password: string;
}

export interface User {
	name: string;
	email: string;
	user_id: string;
	profilePicture: string;
}

export interface AuthHandlers {
	signUp: (req: Request, res: Response) => void;
	signIn: (req: Request, res: Response) => void;
}
