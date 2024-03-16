import notes_css from "../css/notes_panel.module.css";

export default function NotesPanel() {
	return (
		<div className={notes_css.panel}>
			<h3>Notebook Title &gt; Notes</h3>
			<button>Create Note</button>
			<div className={notes_css.block}>
				<h3>Note Title</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
					veritatis ...
				</p>
				<small>X minutes ago</small>
			</div>
		</div>
	);
}
