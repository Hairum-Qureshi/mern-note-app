import { useEffect, useState } from "react";
import useAuth from "../contexts/authContext";
import { Notebook } from "../interfaces";
import notebook_css from "../css/notebook.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBook,
	faPenToSquare,
	faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Modal from "./Modal";

export default function UserNotebooks() {
	const { userData, notebookData } = useAuth()!;
	const [notebooks, setNotebooks] = useState<Notebook[]>();
	const [modalStatus, setModalStatus] = useState(false);
	const [notebookID, setNotebookID] = useState<string>();
	const [notebookName, setNotebookName] = useState<string>();

	const { user_id } = useParams();

	// const notebookDataCOPY = [...notebookData];
	// const x = copy.map((x: Notebook) => {
	// 	x._id;
	// })

	useEffect(() => {
		if (notebookData) {
			setNotebooks(notebookData);
		}
	}, [notebookData]);

	function deleteNotebook() {
		if (userData.notebooksCount === 1) {
			return alert("You must have at least 1 notebook");
		}
	}

	function closeModal() {
		setModalStatus(false);
	}

	function editNotebook(notebookID: string, noteBookName: string) {
		setModalStatus(!modalStatus);
		setNotebookID(notebookID);
		setNotebookName(noteBookName);
	}

	return userData && userData.user_id === user_id ? (
		<div className={notebook_css.tableContainer}>
			{modalStatus && (
				<Modal
					toggleModalState={closeModal}
					notebookID={notebookID}
					notebookName={notebookName}
				/>
			)}
			<h2>Your Notebooks ({userData && userData.notebooksCount})</h2>
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
					{notebookData &&
						notebookData.map((data: Notebook) => (
							<tr key={data._id}>
								<td>
									<span>
										<FontAwesomeIcon icon={faBook} />
									</span>
									<Link to={`/user/${userData.user_id}/notebook/${data._id}`}>
										{data.notebookName}{" "}
									</Link>
								</td>

								<td>{data.author}</td>
								<td>{data.timeEdited}</td>
								<td>{data.dateCreated}</td>
								<td>
									<span onClick={deleteNotebook}>
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
