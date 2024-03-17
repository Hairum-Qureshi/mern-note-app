import { useEffect, useState, useRef } from "react";
import axios from "axios";
import useAuth from "../contexts/authContext";
import { Notebook, NotebookLogicProperties } from "../interfaces";

export default function useNotebookLogic(): NotebookLogicProperties {
	const { userData } = useAuth()!;
	const [notebookData, setNotebookData] = useState<Notebook | null>(null);
	const notebookNameRef = useRef<string>();

	async function getNotebook(
		notebook_id: string | undefined
	): Promise<string | undefined> {
		try {
			const response = await axios.get(
				`http://localhost:4000/api/notebook/${notebook_id}`
			);
			return response.data;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	}

	function validateName(
		newName: string,
		toggleModalState: () => void,
		notebookID: string,
		modalType: boolean
	) {
		if (newName.trim()) {
			notebookNameRef.current = newName.trim(); // Setting the ref
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
			.catch(error => console.log(error));
	}

	return { validateName, notebookData, getNotebook };
}
