import { useEffect } from "react";
import Tray from "./components/Tray";
import { electronAPI } from "./utils";
import { closeAllPopovers } from "./atoms/popoverAtom";
import { useChat } from "./hooks/useChat";
import { usePopover } from "./hooks/usePopover";
import { STEPS } from "./atoms/chatAtom";
import { useAPIKey } from "./hooks/useApiKey";

const App = () => {
  const { chatStepRef } = useChat();
  const { openPopoverIdRef } = usePopover();
  const { setAPIKey } = useAPIKey();
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

  useEffect(() => {
    const loadKey = async () => {
      const savedKey = await electronAPI.loadApiKey();
      setAPIKey(savedKey);
    };
    loadKey();
  }, []);

  return <Tray />;
};

export default App;
