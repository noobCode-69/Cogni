import { createRoot } from "react-dom/client";
import App from "./ui";
import "./ui/index.css";

const root = createRoot(document.getElementById("root"));

root.render(<App />);
