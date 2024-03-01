import modal_css from "../css/modal.module.css";
import { useState } from "react";
import useModalLogic from "../hooks/useNotebookLogic";
import { ModalProps } from "../interfaces";

export default function Modal({ toggleModalState }: ModalProps) {
	const [newName, setNewName] = useState("");

	const { confirmName } = useModalLogic();

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
					<button onClick={() => confirmName(newName, toggleModalState)}>
						Change Name
					</button>
				</div>
			</div>
		</div>
	);
}
