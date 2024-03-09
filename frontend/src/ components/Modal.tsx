import modal_css from "../css/modal.module.css";
import { useEffect, useState } from "react";
import useNotebookLogic from "../hooks/useNotebookLogic";
import { ModalProps } from "../interfaces";

export default function Modal({
	toggleModalState,
	notebookID,
	notebookName,
	getNotebookName,
	textToDisplay
}: ModalProps) {
	const [newName, setNewName] = useState(notebookName);
	const { validateName } = useNotebookLogic();
	const [modalType, setModalType] = useState<boolean>(
		textToDisplay === "Rename your notebook:"
	);
	getNotebookName(newName);

	return (
		<div id={modal_css.myModal} className={modal_css.modal}>
			<div className={modal_css.modalContent}>
				<span className={modal_css.close} onClick={toggleModalState}>
					&times;
				</span>
				<div className={modal_css.container}>
					<label>{textToDisplay}</label>
					<input
						type="text"
						value={modalType ? newName : ""}
						onChange={event => setNewName(event.target.value)}
					/>
					<button
						onClick={() =>
							validateName(newName, toggleModalState, notebookID, modalType)
						}
					>
						{modalType ? "Change Name" : "Create Notebook"}
					</button>
				</div>
			</div>
		</div>
	);
}
