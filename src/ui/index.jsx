import { useEffect } from "react";
import Tray from "./components/Tray";
import { electronAPI } from "./utils";

const App = () => {
  useEffect(() => {
    electronAPI.onWindowBlur((data) => {
      console.log("Window lost focus", data);
    });
  }, []);

  return <Tray />;
};

export default App;
