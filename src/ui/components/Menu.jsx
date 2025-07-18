import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "../primitives/Button";
import { EllipsisVertical } from "lucide-react";
import { usePopover } from "../atoms/popoverAtom";
const Menu = () => {
  const { isOpen, toggle } = usePopover(1);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      requestAnimationFrame(() => {
        if (menuRef.current) {
          const menuRect = menuRef.current.getBoundingClientRect();

          setCoords({
            top: buttonRect.bottom + 10,
            left: buttonRect.right - menuRect.width + 4,
          });
        }
      });
    }
  }, [isOpen]);

  return (
    <>
      <Button ref={buttonRef} onClick={toggle}>
        <EllipsisVertical size={14} />
      </Button>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              background: "rgba(0, 0, 0, 0.6)",
              color: "white",
              padding: "10px",
              borderRadius: "4px",
              zIndex: 9999,
              border: "0.9px solid #3a3a3a",
            }}
          >
            HELLO WORLD
          </div>,
          document.getElementById("root-portal")
        )}
    </>
  );
};

export default Menu;
