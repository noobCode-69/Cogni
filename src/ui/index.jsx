import { useEffect } from "react";
import Tray from "./components/Tray";

const App = () => {
  useEffect(() => {
    window.electronAPI.onKeyBoardShortcut((data) => {
      console.log("Received from main:", data);
    });
  }, []);
  return <Tray />;
};

export default App;
