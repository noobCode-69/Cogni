import { useRef, useEffect } from "react";

export function useMouseHover(onEnter, onLeave) {
  const ref = useRef();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseEnter = () => onEnter();
    const handleMouseLeave = () => onLeave();

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onEnter, onLeave]);

  return ref;
}
