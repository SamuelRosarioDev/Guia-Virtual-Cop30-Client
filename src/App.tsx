import { RouterProvider } from "react-router-dom";
import { RoutesSystem } from "./routes/router";

export function App() {
	return (
		<>
			<RouterProvider router={RoutesSystem} />
		</>
	);
}
