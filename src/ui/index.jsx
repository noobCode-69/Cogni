import { useEffect } from "react";
import Tray from "./components/Tray";
import { electronAPI } from "./utils";
import { closeAllPopovers } from "./atoms/popoverAtom";
import { useChat } from "./hooks/useChat";
import { usePopover } from "./hooks/usePopover";
import { STEPS } from "./atoms/chatAtom";

const App = () => {
  const { chatStepRef } = useChat();
  const { openPopoverIdRef } = usePopover();
  useEffect(() => {
    const handleBlur = (data) => {
      const { blurred } = data;
      if (
        openPopoverIdRef.current === 2 &&
        chatStepRef.current !== STEPS.INPUT
      ) {
        return;
      }
      if (blurred) {
        closeAllPopovers();
      }
    };

    electronAPI.onWindowBlur(handleBlur);
  }, []);

  return <Tray />;
};

export default App;
