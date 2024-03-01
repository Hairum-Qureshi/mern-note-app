import { ModalProperties } from "../interfaces";

export default function useModalLogic(): ModalProperties {
	function confirmName(newName: string, toggleModalState: () => void) {
		if (newName.trim()) {
			console.log(newName);
			toggleModalState();
		} else {
			alert("Please input something!");
		}
	}

	return { confirmName };
}
