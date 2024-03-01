import modal_css from "../css/modal.module.css";
import { useEffect, useState } from "react";
import useNotebookLogic from "../hooks/useNotebookLogic";
import { ModalProps } from "../interfaces";

export default function Modal({ toggleModalState, notebookID }: ModalProps) {
	const [newName, setNewName] = useState("");
	const { validateName } = useNotebookLogic();

	return (
		<div id={modal_css.myModal} className={modal_css.modal}>
			<div className={modal_css.modalContent}>
				<span className={modal_css.close} onClick={toggleModalState}>
					&times;
				</span>
				<div className={modal_css.container}>
					<label>Rename your notebook:</label>
					<input
						type="text"
						value={newName}
						onChange={event => setNewName(event.target.value)}
					/>
					<button
						onClick={() => validateName(newName, toggleModalState, notebookID)}
					>
						Change Name
					</button>
				</div>
			</div>
		</div>
	);
}
