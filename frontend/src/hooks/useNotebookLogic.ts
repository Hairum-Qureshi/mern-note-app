import { NotebookLogicProperties } from "../interfaces";
import axios from "axios";
import useAuth from "../contexts/authContext";
import { useState } from "react";

export default function useNotebookLogic(): NotebookLogicProperties {
	const { userData } = useAuth()!;
	const [newNotebookData, setNewNotebookData] = useState();

	function validateName(
		newName: string,
		toggleModalState: () => void,
		notebookID: string,
		modalType: boolean
	) {
		if (newName.trim()) {
			toggleModalState();
			modalType
				? updateName(newName.trim(), notebookID)
				: createNotebook(newName.trim());
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

	function createNotebook(notebookName: string) {
		axios
			.post("http://localhost:4000/api/notebook/create", {
				notebookName: notebookName,
				user_id: userData.user_id,
				username: userData.name,
				currentDate: new Date().toLocaleDateString("en-US")
			})
			.then(response => console.log(response))
			.catch(error => console.log(error));
	}

	return { validateName };
}
