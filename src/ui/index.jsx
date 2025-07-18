import { useEffect } from "react";
import Tray from "./components/Tray";
import { electronAPI } from "./utils";
import { closeAllPopovers } from "./atoms/popoverAtom";

const App = () => {
  useEffect(() => {
    const handleBlur = (data) => {
      const { blurred } = data;
      if (blurred) {
        closeAllPopovers();
      }
    };

    electronAPI.onWindowBlur(handleBlur);
  }, []);

  return <Tray />;
};

export default App;
