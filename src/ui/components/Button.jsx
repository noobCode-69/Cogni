import { useState } from "react";
import { useMouseHover } from "../hooks/useMoveOver";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";

export const Button = ({ variant = "default", onClick, children }) => {
  const hoverRef = useMouseHover(
    () => {
      window.electronAPI.sendRendererEvent(
        EVENT_CONSTANTS.TOGGLE_MOUSE_EVENTS,
        "ENTER"
      );
    },
    () => {
      window.electronAPI.sendRendererEvent(
        EVENT_CONSTANTS.TOGGLE_MOUSE_EVENTS,
        "EXIT"
      );
    }
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
  };

  let background;
  if (variant === "default") {
    background = "transparent";
  } else if (variant === "hover") {
    background = isHovered ? "rgba(74, 74, 74, 0.3)" : "transparent";
  }

  return (
    <div
      ref={hoverRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        background,
        padding: "5px 10px",
        borderRadius: "4px",
        color: "#fff",
        cursor: "pointer",
        transition: "background 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {children}
    </div>
  );
};
