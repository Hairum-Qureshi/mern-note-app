import { NotebookLogicProperties } from "../interfaces";
import axios from "axios";
import useAuth from "../contexts/authContext";

export default function useNotebookLogic(): NotebookLogicProperties {
	const { userData } = useAuth()!;

	function validateName(
		newName: string,
		toggleModalState: () => void,
		notebookID: string,
		modalType: boolean
	) {
		if (newName.trim()) {
			toggleModalState();
			modalType ? updateName(newName.trim(), notebookID) : createNotebook();
		} else {
			alert("Please input something!");
		}
	}

	function updateName(newName: string, notebookID: string): void {
		axios.patch(
			"http://localhost:4000/api/notebook/update",
			{
				notebookName: newName,
				user_id: userData.user_id,
				notebook_id: notebookID
			},
			{
				withCredentials: true
			}
		);
	}

	function createNotebook() {
		console.log("Create notebook function called!");
	}

	return { validateName };
}
