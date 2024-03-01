import modal_css from "../css/modal.module.css";

type Props = {
	toggleModalState: () => void;
};

export default function Modal({ toggleModalState }: Props) {
	return (
		<div id={modal_css.myModal} className={modal_css.modal}>
			<div className={modal_css.modalContent}>
				<span className={modal_css.close} onClick={toggleModalState}>
					<label>Enter a new name for your notebook:</label>
					<input type="text" />
				</span>
				<p>This is a modal</p>
			</div>
		</div>
	);
}
