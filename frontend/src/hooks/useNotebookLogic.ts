import { useEffect, useState } from "react";
import { ModalProperties } from "../interfaces";
import axios from "axios";
import useAuth from "../contexts/authContext";

export default function useNotebookLogic(): ModalProperties {
	const { userData } = useAuth()!;

	function validateName(
		newName: string,
		toggleModalState: () => void,
		notebookID: string
	) {
		if (newName.trim()) {
			toggleModalState();
			updateName(newName.trim(), notebookID);
		} else {
			alert("Please input something!");
		}
	}

	function updateName(newName: string, notebookID: string): void {
		axios
			.patch(
				"http://localhost:4000/api/notebook/update",
				{
					notebookName: newName,
					user_id: userData.user_id,
					notebook_id: notebookID
				},
				{
					withCredentials: true
				}
			)
			.then(res => {
				console.log(res);
			});
	}

	return { validateName };
}
