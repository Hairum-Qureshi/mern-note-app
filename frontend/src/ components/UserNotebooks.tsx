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

export default function UserNotebooks() {
	const { userData, notebookData } = useAuth()!;
	const [notebooks, setNotebooks] = useState<Notebook[]>();

	const { user_id } = useParams();

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

	function editNotebook() {
		alert("Editing notebook...");
	}

	return userData && userData.user_id === user_id ? (
		<div className={notebook_css.tableContainer}>
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
						notebookData.map((data: Notebook, index: number) => (
							<tr key={index}>
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
									<span onClick={editNotebook}>
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
