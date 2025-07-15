import { EVENT_CONSTANTS } from "../../electron/renderUtils";

const Tray = () => {
  const onClick = (direction) => {
    window.electronAPI.repositionMainWindow(
      EVENT_CONSTANTS.REPOSITION_MAIN_WINDOW,
      direction
    );
  };

  return (
    <div
      style={{
        border: "0.9px solid #4a4a4a",
      }}
      className="h-[100%] w-[100%] bg-black/40 flex items-center justify-center rounded-lg "
    >
      <button className="m-2" onClick={() => onClick(-1)}>
        LEFT
      </button>
      <button className="m-2" onClick={() => onClick(1)}>
        RIGHT
      </button>
    </div>
  );
};

export default Tray;
