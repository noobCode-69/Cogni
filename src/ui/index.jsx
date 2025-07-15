import { useEffect } from "react";
import Tray from "./components/Tray";

const App = () => {
  useEffect(() => {
    // Register all your keyboard shortcuts handlers
    window.electronAPI.onKeyBoardShortcut((data) => {
      console.log("Received from main:", data);
    });
  }, []);
  return (
    <div
      style={{ padding: "2px" }}
      className="flex items-center justify-center w-full h-screen"
    >
      <Tray />
    </div>
  );
};

export default App;
