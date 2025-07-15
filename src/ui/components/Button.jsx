import { useState } from "react";

export const Button = ({ variant = "default", onClick, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  let background;
  if (variant === "default") {
    background = "transparent";
  } else if (variant === "hover") {
    background = isHovered ? "rgba(74, 74, 74, 0.3)" : "transparent";
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        background,
        padding: "4px 6px",
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
