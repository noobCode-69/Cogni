import Button from "../primitives/Button";
import { Command, CornerDownLeft } from "lucide-react";
import styled from "styled-components";
import { usePopover } from "../atoms/popoverAtom";
import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { electronAPI } from "../utils";
import { EVENT_CONSTANTS } from "../../electron/renderUtils";

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShortcutGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ShortcutKey = styled.div`
  background: #2a2a2a;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatBoxContainer = styled.div`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 12px 8px;
  border-radius: 8px;
  z-index: 9999;
  border: 1px solid #3a3a3a;
  width: 500px;
`;

const Chat = () => {
  const { isOpen, toggle } = usePopover(2);

  const buttonRef = useRef(null);

  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 20,
        left: 0,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const handler = () => {
      if (isOpenRef.current) return;
      toggle();
    };

    electronAPI.onKeyBoardShortcut(handler);
  }, []);

  return (
    <>
      <div ref={buttonRef}>
        <Button onClick={toggle}>
          <ButtonContent>
            <span>Ask</span>
            <ShortcutGroup>
              <ShortcutKey>
                <Command size={9} />
              </ShortcutKey>
              <ShortcutKey>
                <CornerDownLeft size={9} />
              </ShortcutKey>
            </ShortcutGroup>
          </ButtonContent>
        </Button>
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <ChatBoxContainer top={coords.top} left={coords.left}>
            hello world
          </ChatBoxContainer>,
          document.getElementById("root-portal")
        )}
    </>
  );
};

export default Chat;
