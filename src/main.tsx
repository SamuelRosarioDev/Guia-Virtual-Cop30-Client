import "./styles/global.style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {App} from "./App";

const root = document.getElementById("root");

if (!root) {
	throw new Error("Elemento com id 'root' não encontrado.");
}

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
