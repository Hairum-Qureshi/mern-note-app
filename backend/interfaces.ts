import { Request, Response } from "express";

export default interface User_Interface {
	_id: string;
	email: string;
	name: string;
	password: string;
	profilePicture: string;
	notesCount: number;
}

export default interface Note_Interface {
	_id: string;
	content: string;
	dateCreated: string;
	timeEdited: string;
	user_id: string;
	author: string;
}

export interface Notebook_Interface {
	_id: string;
	notebookCount: number;
	author: string;
	dateCreated: string;
	notebookName: string;
	notes: Note_Interface;
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

export interface ContextData {
	userData: User;
	error: string;
}

export interface AuthHandlers {
	signUp: (req: Request, res: Response) => void;
	signIn: (req: Request, res: Response) => void;
	signOut: (req: Request, res: Response) => void;
}
