export interface AlertState {
	emailEntered: boolean;
	nameEntered?: boolean;
	passwordEntered: boolean;
}

export interface ReturnTypes {
	signUp: (email: string, name: string, password: string) => void;
	signIn: (email: string, password: string) => void;
	alerts: AlertState;
	errMessage: string | undefined;
}

export interface User {
	name: string;
	email: string;
	user_id: string;
	notebooksCount: number;
	profilePicture?: string;
	notesCount?: number;
	message: string;
}

interface Note {
	_id: string;
	content: string;
	dateCreated: string;
	timeEdited: string;
	user_id: string;
	author: string;
}

export interface Notebook {
	_id: string;
	author: string;
	dateCreated: string;
	timeEdited: string;
	notebookName: string | null;
	notes?: Note;
}

export interface ContextData {
	userData: User;
	error: string;
	signOut: () => Promise<void>;
	notebookData: Notebook[];
}

export interface Props {
	children: React.ReactNode;
}

export interface TimeState {
	currentDate: string;
	currentTime: string;
	greeting: string;
}

export interface ModalProps {
	toggleModalState: () => void;
	notebookID: string | undefined;
	notebookName: string | undefined;
	getNotebookName: (newName: string | null) => void;
	textToDisplay: string;
}

export interface NotebookLogicProperties {
	validateName: (
		newName: string | undefined,
		toggleModalState: () => void,
		notebookID: string | undefined,
		modalType: boolean
	) => void;
}
