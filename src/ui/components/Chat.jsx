import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Command, CornerDownLeft } from "lucide-react";

import Button from "../primitives/Button";
import { electronAPI } from "../utils";
import { useMouseForwarding } from "../hooks/useMouseForwarding";
import { usePopover } from "../hooks/usePopover";

const STEPS = {
  INPUT: "INPUT",
  ANSWER: "ANSWER",
  FOLLOWUP: "FOLLOWUP",
};

const getNextStep = (currentStep) => {
  switch (currentStep) {
    case STEPS.INPUT:
      return STEPS.ANSWER;
    case STEPS.ANSWER:
      return STEPS.FOLLOWUP;
    case STEPS.FOLLOWUP:
      return STEPS.ANSWER;
    default:
      return STEPS.INPUT;
  }
};

const InputBox = ({ coords, setStep, fixed = true, makeQuery }) => {
  const [queryInput, setQueryInput] = useState("");
  const containerRef = useMouseForwarding();
  const inputRef = useRef(null);

  const handleSubmit = () => {
    makeQuery(queryInput);
    setStep(STEPS.ANSWER);
    setQueryInput("");
  };

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };
    input.addEventListener("keydown", handleKeyDown);
    return () => input.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <QuestionBoxContainer ref={containerRef} fixed={fixed} top={coords.top}>
      <StyledInput
        ref={inputRef}
        value={queryInput}
        onChange={(e) => {
          setQueryInput(e.target.value);
        }}
        placeholder="Ask about your screen"
      />
      <InputActions>
        <SolidButton disappearing={true} onClick={handleSubmit}>
          <ButtonContent>
            <span>Submit</span>
            <ShortcutKey style={{ background: "#3a3a3a" }}>
              <CornerDownLeft size={9} />
            </ShortcutKey>
          </ButtonContent>
        </SolidButton>
      </InputActions>
    </QuestionBoxContainer>
  );
};

const AnswerBox = ({ coords, step, setStep, makeQuery }) => (
  <AnswerBoxContainer top={coords.top}>
    <Answer>AnswerBox</Answer>
    {step === STEPS.FOLLOWUP && (
      <InputBox
        makeQuery={makeQuery}
        fixed={false}
        coords={coords}
        setStep={setStep}
      />
    )}
  </AnswerBoxContainer>
);

const StepRenderer = ({ step, coords, setStep, makeQuery }) => {
  switch (step) {
    case STEPS.INPUT:
      return (
        <InputBox
          fixed={true}
          coords={coords}
          setStep={setStep}
          makeQuery={makeQuery}
        />
      );
    case STEPS.ANSWER:
    case STEPS.FOLLOWUP:
      return (
        <AnswerBox
          coords={coords}
          step={step}
          setStep={setStep}
          makeQuery={makeQuery}
        />
      );
    default:
      return null;
  }
};

const Chat = () => {
  const { isOpen, toggle, isOpenRef } = usePopover(2);
  const [step, setStep] = useState(STEPS.INPUT);
  const buttonRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0 });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const { bottom } = buttonRef.current.getBoundingClientRect();
      setCoords({ top: bottom + 15 });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleShortcut = () => {
      if (isOpenRef.current) {
        setStep((prev) => getNextStep(prev));
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
      if (step === STEPS.INPUT) {
        toggle();
      } else {
        setStep((prev) => getNextStep(prev));
      }
    }
  };

  const makeQuery = (query) => {
    console.log(`${query}`);
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
          <StepRenderer
            step={step}
            coords={coords}
            setStep={setStep}
            makeQuery={makeQuery}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
};

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

const QuestionBoxContainer = styled(({ fixed, top, ...rest }) => (
  <div {...rest} />
))`
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

const AnswerBoxContainer = styled.div`
  position: fixed;
  top: ${({ top }) => `${top}px`};
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px;
  border-radius: 8px;
  z-index: 9999;
  border: 1px solid #3a3a3a;
  width: 600px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  background: transparent;
  border: none;
  padding: 4px;
  color: white;
  border-radius: 8px;
  &::placeholder {
    color: grey;
    font-weight: semibold;
  }
`;

const InputActions = styled.div`
  background: transparent;
  width: 100px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SolidButton = styled(Button)`
  background-color: rgba(74, 74, 74, 0.3);
  &:hover {
    background-color: rgba(74, 74, 74, 0.3);
  }
`;

const Answer = styled.div`
  padding: 4px;
  min-height: 200px;
  max-height: 400px;
`;
export default Chat;
