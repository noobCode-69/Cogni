import { createRoot } from "react-dom/client";
import App from "./ui";
import "frosted-ui/styles.css";
import "./index.css";
import { Theme } from "frosted-ui";

const root = createRoot(document.getElementById("root"));

root.render(
  <Theme>
    <App />
  </Theme>
);
