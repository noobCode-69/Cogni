import { Button } from "./Button";
import { EllipsisVertical } from "lucide-react";
import { Command } from "lucide-react";
import { CornerDownLeft } from "lucide-react";
import { Slash } from "lucide-react";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";

const Tray = () => {
  const handleOnClick = (event, payload) => {
    window.electronAPI.sendRendererEvent(event, payload);
  };

  return (
    <div
      style={{
        border: "0.9px solid #3a3a3a",
      }}
      className="h-[100%] w-[100%] bg-black/40 flex items-center  justify-center rounded-lg "
    >
      <Button variant="hover">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Ask
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <div
              style={{
                background: "#3a3a3a",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              <Command size={9} />
            </div>
            <div
              style={{
                background: "#3a3a3a",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              <CornerDownLeft size={9} />
            </div>
          </div>
        </div>
      </Button>
      <Button
        variant="hover"
        onClick={() => handleOnClick(EVENT_CONSTANTS.HIDE_APP)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Hide
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <div
              style={{
                background: "#3a3a3a",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              <Command size={9} />
            </div>
            <div
              style={{
                background: "#3a3a3a",
                padding: "4px",
                borderRadius: "4px",
                transform: "rotateY(180deg)",
              }}
            >
              <Slash size={9} />
            </div>
          </div>
        </div>
      </Button>
      <Button variant="transparent">
        <EllipsisVertical size={14} />
      </Button>
    </div>
  );
};

export default Tray;
