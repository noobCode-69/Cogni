import { useEffect } from "react";
import Tray from "./components/Tray";
import { electronAPI } from "./utils";
import { closeAllPopovers } from "./atoms/popoverAtom";
import { useChatStep } from "./hooks/useChatStep";
import { usePopover } from "./hooks/usePopover";
import { STEPS } from "./atoms/chatStepAtom";

const App = () => {
  const { chatStepRef } = useChatStep();
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
