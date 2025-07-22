import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Command, CornerDownLeft } from "lucide-react";

import Button from "../primitives/Button";
import { electronAPI } from "../utils";
import { useMouseForwarding } from "../hooks/useMouseForwarding";
import { usePopover } from "../hooks/usePopover";
import { openaiChatStream } from "../ai-utils/openai";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { STEPS } from "../atoms/chatStepAtom";
import { useChatStep } from "../hooks/useChatStep";
import { useAnswer } from "../hooks/useAnswer";
import LoadingDots from "./Loading";
import { X } from "lucide-react";
import { closeAllPopovers } from "../atoms/popoverAtom";

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

const InputBox = ({ coords, fixed = true, makeQuery }) => {
  const { setChatStep } = useChatStep();
  const containerRef = useMouseForwarding();
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const inputValue = inputRef.current?.value || "";
    makeQuery(inputValue);
    setChatStep(STEPS.ANSWER);
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
      <StyledInput ref={inputRef} placeholder="Ask about your screen" />
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

const CloseAnswerPopover = () => {
  return (
    <SolidButton onClick={closeAllPopovers} disappearing={true}>
      <X size={12} />
    </SolidButton>
  );
};

const AnswerBox = ({ coords, makeQuery }) => {
  const { chatStep } = useChatStep();
  const { answer, isLoading } = useAnswer();
  return (
    <AnswerBoxContainer top={coords.top}>
      <Answer>
        {isLoading && !answer ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <LoadingDots />
            <CloseAnswerPopover />
          </div>
        ) : (
          <MarkdownPreview
            source={answer}
            style={{
              fontSize: "0.7rem",
              background: "transparent",
            }}
          />
        )}
      </Answer>
      {chatStep === STEPS.FOLLOWUP && (
        <InputBox makeQuery={makeQuery} fixed={false} coords={coords} />
      )}
    </AnswerBoxContainer>
  );
};

const StepRenderer = ({ coords, makeQuery }) => {
  const { chatStep } = useChatStep();
  switch (chatStep) {
    case STEPS.INPUT:
      return <InputBox fixed={true} coords={coords} makeQuery={makeQuery} />;
    case STEPS.ANSWER:
    case STEPS.FOLLOWUP:
      return <AnswerBox coords={coords} makeQuery={makeQuery} />;
    default:
      return null;
  }
};

const Chat = () => {
  const { isOpen, toggle, isOpenRef } = usePopover(2);
  const { chatStep, setChatStep } = useChatStep();
  const buttonRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0 });
  const { setAnswer, setIsLoading, setError } = useAnswer();

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const { bottom } = buttonRef.current.getBoundingClientRect();
      setCoords({ top: bottom + 15 });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleShortcut = () => {
      if (isOpenRef.current) {
        setChatStep((prev) => getNextStep(prev));
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
      if (chatStep === STEPS.INPUT) {
        toggle();
      } else {
        setChatStep((prev) => getNextStep(prev));
      }
    }
  };

  const makeQuery = (query) => {
    setIsLoading(true);
    setAnswer("");
    openaiChatStream({
      userMessage: query,
      onChunk: (chunk) => {
        setAnswer((prev) => prev + chunk);
      },
      onFinish: () => {
        setIsLoading(false);
      },
      onError: () => {
        setAnswer("");
        setIsLoading(false);
        setError(true);
      },
    });
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
          <StepRenderer coords={coords} makeQuery={makeQuery} />,
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
  padding-top: 10px;
  padding-bottom: 10px;
  max-height: 400px;
  overflow-y: scroll;
`;
export default Chat;
