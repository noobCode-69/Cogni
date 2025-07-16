import { useState } from "react";

export const Button = ({ variant = "default", onClick, onHover, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    if (onHover) onHover(e, true);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    if (onHover) onHover(e, false);
  };

  let background;
  if (variant === "default") {
    background = "transparent";
  } else if (variant === "hover") {
    background = isHovered ? "rgba(74, 74, 74, 0.3)" : "transparent";
  }

  return (
    <div
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
