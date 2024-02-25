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
}

export interface ContextData {
	userData: User;
	error: string;
	signOut: () => Promise<void>;
}

export interface Props {
	children: React.ReactNode;
}

export default interface TimeState {
	currentDate: string;
	currentTime: string;
	greeting: string;
}
