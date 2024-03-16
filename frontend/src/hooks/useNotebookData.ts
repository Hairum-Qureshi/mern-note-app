import axios from "axios";

export default function useNotebookData(): void {
	async function getNotes(user_id: string, notebook_id: string) {
		await axios
			.get(`http://localhost:4000/api/notes/notebook/${notebook_id}/${user_id}`)
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log("There was an error", error);
			});
	}

	// async function createNote(notebook_id: string) {
	// 	await axios.post(
	// 		`http://localhost:4000/api/notes/create`,
	// 		{
	// 			withCredentials: true
	// 		},
	// 		{
	// 			notebook_id
	// 		}
	// 	);
	// }
}
