import { useRef, useEffect } from "react";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";

export function useMouseForwarding() {
  const ref = useRef();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseEnter = () => {
      electronAPI.sendRendererEvent(EVENT_CONSTANTS.MOUSE_FORWARDING, "ENTER");
    };
    const handleMouseLeave = () => {
      electronAPI.sendRendererEvent(EVENT_CONSTANTS.MOUSE_FORWARDING, "EXIT");
    };
    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
}
