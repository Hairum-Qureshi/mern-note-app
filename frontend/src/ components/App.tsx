import "../css/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import SignUp from "./SignUp";
import Landing from "./Landing";
import SignIn from "./SignIn";
import Navbar from "./Navbar";
import Notebook from "./UserNotebooks";
import Notes from "./Notes";
import UserNotes from "./UserNotes";
import { AuthProvider } from "../contexts/authContext";

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Navbar />
				<Routes>
					{/* Maybe add a profile page */}
					<Route path="/" element={<Landing />} />
					<Route path="/home" element={<Home />} />
					<Route path="/notebooks/:user_id" element={<Notebook />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/notes" element={<UserNotes />} />
					<Route
						path="/user/:user_id/notebook/:notebook_id"
						element={<Notes />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
