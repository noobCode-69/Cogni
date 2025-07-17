import { Button } from "./Button";
import { EllipsisVertical } from "lucide-react";
import { Command } from "lucide-react";
import { CornerDownLeft } from "lucide-react";
import { Slash } from "lucide-react";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";
import { Text } from "frosted-ui";

const Tray = () => {
  const handleOnClick = (event, payload) => {
    window.electronAPI.sendRendererEvent(event, payload);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        border: "0.9px solid #3a3a3a",
        borderRadius: "4px",
        width: "fit-content",
        padding: "4px",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
      }}
    >
      <Button variant="hover">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Text size="1">Ask</Text>
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
          <Text size="1">Hide</Text>
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
