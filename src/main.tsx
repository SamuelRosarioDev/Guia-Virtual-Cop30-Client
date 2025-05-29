import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { GlobalStyles } from "./styles/global.styles";
const root = document.getElementById("root");

if (!root) throw new Error("Elemento com id 'root' não encontrado.");

createRoot(root).render(
	<StrictMode>
		<GlobalStyles />
		<App />
	</StrictMode>,
);
