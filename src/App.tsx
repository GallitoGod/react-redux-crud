import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUser } from "./components/createNewUser";
import { ListOfUsers } from "./components/listOfUser";

function App() {
	return (
		<>
			<ListOfUsers />
			<CreateNewUser />
			<Toaster richColors />
		</>
	);
}

export default App;
