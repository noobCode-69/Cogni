import { useEffect, useRef } from "react";
import styled from "styled-components";
import { CornerDownLeft } from "lucide-react";

import Button from "../../primitives/Button";
import { useMouseForwarding } from "../../hooks/useMouseForwarding";
import { useChat } from "../../hooks/useChat";
import { STEPS } from "../../atoms/chatAtom";

const InputBox = ({ coords, fixed = true, makeQuery }) => {
  const { setChatStep } = useChat();
  const containerRef = useMouseForwarding();
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const value = inputRef.current?.value || "";
    makeQuery(value);
    setChatStep(STEPS.ANSWER);
  };

  useEffect(() => {
    const input = inputRef.current;
    input?.focus();
    const keyHandler = (e) => e.key === "Enter" && handleSubmit();
    input?.addEventListener("keydown", keyHandler);
    return () => input?.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <Container ref={containerRef} fixed={fixed} top={coords.top}>
      <StyledInput ref={inputRef} placeholder="Ask about your screen" />
      <InputActions>
        <SubmitButton
          shouldAllowMouseForwarding={false}
          disappearing={true}
          onClick={handleSubmit}
        >
          <span>Submit</span>
          <KeyIcon>
            <CornerDownLeft size={9} />
          </KeyIcon>
        </SubmitButton>
      </InputActions>
    </Container>
  );
};

export default InputBox;

const Container = styled.div`
  ${({ fixed, top }) =>
    fixed &&
    `
    position: fixed;
    top: ${top}px;
    left: 50%;
    transform: translateX(-50%);
  `}
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px;
  border-radius: 8px;
  z-index: 9999;
  border: 1px solid #3a3a3a;
  display: flex;
  align-items: center;
  width: ${({ fixed }) => (fixed ? "600px" : "auto")};
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
