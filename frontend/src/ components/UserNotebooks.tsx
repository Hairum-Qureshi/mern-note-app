import { useEffect, useState } from "react";
import useAuth from "../contexts/authContext";
import { Notebook } from "../interfaces";

export default function UserNotebooks() {
	const { userData, notebookData } = useAuth()!;
	const [notebooks, setNotebooks] = useState<Notebook>();

	useEffect(() => {
		if (notebookData) {
			setNotebooks(notebookData);
		}
	}, [notebookData]);

	return (
		<div
			style={{
				border: "2px solid white",
				margin: "0 auto",
				width: "40%",
				padding: "20px",
				wordWrap: "break-word"
			}}
		>
			{notebooks && JSON.stringify(notebooks)}
		</div>
	);
}
