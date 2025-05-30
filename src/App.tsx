import { RouterProvider } from "react-router-dom";
import { RoutesSystem } from "./routes/router";
import { ToastContainer } from "react-toastify";
export function App() {
	return (
		<>
			<ToastContainer/>
			<RouterProvider router={RoutesSystem} />
		</>
	);
}
