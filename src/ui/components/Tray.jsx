import { Button } from "./Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Tray = () => {
  const handleOnClick = (direction) => {
    window.electronAPI.repositionMainWindow(direction);
  };

  return (
    <div
      style={{
        border: "0.9px solid #4a4a4a",
      }}
      className="h-[100%] w-[100%] bg-black/40 flex items-center justify-center rounded-lg "
    >
      <Button variant="hover" onClick={() => handleOnClick(-1)}>
        <ArrowLeft size={14} />
      </Button>
      <Button variant="hover" onClick={() => handleOnClick(1)}>
        <ArrowRight size={14} />
      </Button>
    </div>
  );
};

export default Tray;
