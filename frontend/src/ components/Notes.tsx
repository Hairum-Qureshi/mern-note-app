import { useParams } from "react-router-dom";

export default function Notes() {
	const { user_id, notebook_id } = useParams();

	return (
		<div style={{ color: "white", textAlign: "center" }}>
			<h1>User ID: {user_id}</h1>
			<br />
			<h1>Notebook ID: {notebook_id}</h1>
		</div>
	);
}
