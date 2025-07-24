import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../primitives/Button";
import styled from "styled-components";
import { usePopover } from "../hooks/usePopover";
import { CornerDownLeft } from "lucide-react";
import { useMouseForwarding } from "../hooks/useMouseForwarding";

const APIInput = ({ coords }) => {
  const containerRef = useMouseForwarding();
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    input?.focus();
    const keyHandler = (e) => e.key === "Enter" && handleSubmit();
    input?.addEventListener("keydown", keyHandler);
    return () => input?.removeEventListener("keydown", keyHandler);
  }, []);

  const handleSubmit = () => {};

  return (
    <Container ref={containerRef} top={coords.top}>
      <StyledInput ref={inputRef} placeholder="OpenAI API key" />
      <InputActions>
        <SubmitButton
          shouldAllowMouseForwarding={false}
          disappearing={true}
          onClick={() => {}}
        >
          <span>Save</span>
          <KeyIcon>
            <CornerDownLeft size={9} />
          </KeyIcon>
        </SubmitButton>
      </InputActions>
    </Container>
  );
};

const API = () => {
  const { isOpen, toggle } = usePopover(3);
  const [coords, setCoords] = useState({ top: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const { bottom } = buttonRef.current.getBoundingClientRect();
      setCoords({ top: bottom + 15 });
    }
  }, [isOpen]);

  return (
    <>
      <ButtonContainer ref={buttonRef}>
        <SolidButton onClick={toggle}>
          <ButtonContent>
            <span>API Key</span>
          </ButtonContent>
        </SolidButton>
      </ButtonContainer>

      {isOpen &&
        ReactDOM.createPortal(
          <APIInput coords={coords} />,
          document.getElementById("root-portal")
        )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: ${({ top }) => top}px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px;
  border-radius: 8px;
  z-index: 9999;
  border: 1px solid #3a3a3a;
  display: flex;
  align-items: center;
  width: 600px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SolidButton = styled(Button)`
  background-color: rgba(19, 115, 230, 0.7);

  &:hover {
    background-color: rgba(0, 86, 179, 0.7);
  }
`;

const StyledInput = styled.input`
  flex-grow: 1;
  background: transparent;
  border: none;
  padding: 4px;
  color: white;
  &::placeholder {
    color: grey;
    font-weight: semibold;
  }
`;

const InputActions = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled(Button)`
  background-color: rgba(74, 74, 74, 0.3);
  &:hover {
    background-color: rgba(74, 74, 74, 0.3);
  }
`;

const KeyIcon = styled.div`
  background: #3a3a3a;
  padding: 4px;
  border-radius: 4px;
  margin-left: 8px;
`;

export default API;
