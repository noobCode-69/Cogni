import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Command, CornerDownLeft } from "lucide-react";

import Button from "../primitives/Button";
import { usePopover } from "../atoms/popoverAtom";
import { electronAPI } from "../utils";

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
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 12px 8px;
  border-radius: 8px;
  z-index: 9999;
  border: 1px solid #3a3a3a;
  width: 500px;
`;

const InputBox = ({ coords }) => (
  <ChatBoxContainer top={coords.top}>InputBox</ChatBoxContainer>
);

const AnswerBox = ({ coords, step }) => (
  <ChatBoxContainer top={coords.top}>
    AnswerBox
    {step === 3 && <div>Dummy input box</div>}
  </ChatBoxContainer>
);

const Chat = () => {
  const { isOpen, toggle } = usePopover(2);
  const [step, setStep] = useState(1);
  const buttonRef = useRef(null);
  const isOpenRef = useRef(isOpen);
  const [coords, setCoords] = useState({ top: 0 });

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const { bottom } = buttonRef.current.getBoundingClientRect();
      setCoords({ top: bottom + 15 });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleShortcut = () => {
      if (isOpenRef.current) {
        setStep((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 2));
      } else {
        toggle();
      }
    };

    electronAPI.onKeyBoardShortcut(handleShortcut);
  }, []);

  const handleButtonClick = () => {
    if (!isOpenRef.current) {
      toggle();
    } else {
      setStep((prev) => (prev === 2 ? 3 : 2));
      if (step === 1) toggle();
    }
  };

  return (
    <>
      <div ref={buttonRef}>
        <Button onClick={handleButtonClick}>
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
          step === 1 ? (
            <InputBox coords={coords} />
          ) : (
            <AnswerBox coords={coords} step={step} />
          ),
          document.getElementById("root-portal")
        )}
    </>
  );
};

export default Chat;
