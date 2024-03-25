import { useEffect, useState } from "react";
import useAuth from "../contexts/authContext";
import { Notebook } from "../interfaces";
import notebook_css from "../css/notebook.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBook,
	faPenToSquare,
	faPlus,
	faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Modal from "./Modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UserNotebooks() {
	const { userData, notebookData } = useAuth()!;
	// const [notebooks, setNotebooks] = useState<Notebook[]>();
	const [modalStatus, setModalStatus] = useState(false);
	const [notebookID, setNotebookID] = useState<string>();
	const [notebookName, setNotebookName] = useState<string>();
	const [newNotebookName, setNewNotebookName] = useState<string | null>(null);
	const { user_id } = useParams();
	const [notebookDataCopy, setNotebookDataCopy] = useState<Notebook[]>();
	const [modalLabelText, setModalText] = useState("Rename your notebook:");

	useEffect(() => {
		if (notebookData) {
			setNotebookDataCopy([...notebookData]);
		}
	}, [notebookData]);

	function deleteNotebook(notebookID: string, notebookName: string | null) {
		if (userData.notebooksCount === 1 || notebookDataCopy?.length === 1) {
			return toast("You must have at least 1 notebook", {
				icon: "⚠️",
				style: {
					borderRadius: "10px",
					background: "#D9790D",
					color: "#fff"
				}
			});
		} else {
			// Maybe have it so that the notes made in that notebook won't get deleted?
			const confirmation = confirm(
				`Are you sure you would like to delete the notebook "${notebookName}"? Once deleted, all notes made inside that notebook will also be deleted!`
			);
			// toast(t => (
			// 	<span>
			// 		Custom and <b>bold</b>
			// 		<button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
			// 	</span>
			// ));
			if (confirmation && userData && userData.user_id) {
				const filteredNotebooks = notebookDataCopy?.filter(
					(notebook: Notebook) => notebook._id !== notebookID
				);
				setNotebookDataCopy(filteredNotebooks);

				axios
					.delete(
						`http://localhost:4000/api/notebook/delete-notebook/${notebookID}/${userData.user_id}`
					)
					.then(response => {
						console.log(response.data);
					});
			}
		}
	}

	function closeModal() {
		setModalStatus(false);
	}

	function editNotebook(notebookID: string, noteBookName: string | null) {
		setModalText("Rename your notebook:");
		setModalStatus(!modalStatus);
		setNotebookID(notebookID);
		setNotebookName(noteBookName);
	}

	function getNotebookName(newName: string | null) {
		setNewNotebookName(newName);
	}

	useEffect(() => {
		if (newNotebookName) {
			const index: number = notebookData.findIndex(notebookObj => {
				return notebookObj._id === notebookID;
			});
			notebookData[index].notebookName = newNotebookName;
		}
	}, [newNotebookName]); // <-- dependency needed - do not remove

	const savedNotebookName = sessionStorage.getItem("New notebook name");

	return userData && userData.user_id === user_id ? (
		<div className={notebook_css.tableContainer}>
			<Toaster />

			{modalStatus && (
				<Modal
					toggleModalState={closeModal}
					notebookID={notebookID}
					notebookName={notebookName}
					getNotebookName={getNotebookName}
					textToDisplay={modalLabelText}
				/>
			)}
			<h2>Your Notebooks ({notebookDataCopy?.length})</h2>
			<span>
				<button
					className={notebook_css.addNotebookBtn}
					onClick={() => {
						setModalText("New notebook name:");
						setModalStatus(!modalStatus);
						setNotebookName(notebookName);
					}}
				>
					<FontAwesomeIcon icon={faPlus} /> Notebook
				</button>
			</span>
			<table>
				<thead>
					<tr>
						<th>Notebook Title</th>
						<th>Created by</th>
						<th>Updated</th>
						<th>Created On</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{notebookDataCopy &&
						notebookDataCopy.map((data: Notebook) => (
							<tr key={data._id}>
								<td>
									<span>
										<FontAwesomeIcon icon={faBook} />
									</span>
									<Link to={`/user/${userData.user_id}/notebook/${data._id}`}>
										{data.notebookName}
									</Link>
								</td>

								<td>{data.author}</td>
								<td>{data.timeEdited}</td>
								<td>{data.dateCreated}</td>
								<td>
									<span
										onClick={() => deleteNotebook(data._id, data.notebookName)}
									>
										<FontAwesomeIcon icon={faTrash} />
									</span>
									|
									<span
										onClick={() => editNotebook(data._id, data.notebookName)}
									>
										<FontAwesomeIcon icon={faPenToSquare} />
									</span>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	) : (
		<NotFound />
	);
}
