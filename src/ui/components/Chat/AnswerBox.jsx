import styled from "styled-components";
import { X } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useAnswer } from "../../hooks/useAnswer";
import { useChat } from "../../hooks/useChat";
import { STEPS } from "../../atoms/chatAtom";
import InputBox from "./InputBox";
import IconButton from "../../primitives/IconButton";
import LoadingDots from "./Loading";
import { closeAllPopovers } from "../../atoms/popoverAtom";
import { useMouseForwarding } from "../../hooks/useMouseForwarding";
import { useAbortController } from "../../hooks/useAbortController";
import { useEffect, useRef } from "react";
import { electronAPI } from "../../utils";

const AnswerBox = ({ coords, makeQuery }) => {
  const { chatStep, setChatStep } = useChat();
  const { answer, isLoading, lastQuery } = useAnswer();
  const loading = isLoading && !answer;
  const containerRef = useMouseForwarding();
  const answerAreaRef = useRef();
  const { abort } = useAbortController();

  const handleCloseButton = () => {
    closeAllPopovers();
    setChatStep(STEPS.INPUT);
    abort();
  };
  useEffect(() => {
    const handleShortcut = (accelerator) => {
      if (!answerAreaRef.current) return;
      if (accelerator === "CMD_UP_ARROW") {
        answerAreaRef.current.scrollBy({ top: -100, behavior: "smooth" });
      } else if (accelerator === "CMD_DOWN_ARROW") {
        answerAreaRef.current.scrollBy({ top: 100, behavior: "smooth" });
      }
    };
    electronAPI.onKeyBoardShortcut(handleShortcut);
  }, []);

  return (
    <Container ref={containerRef} top={coords.top}>
      <AnswerArea ref={answerAreaRef}>
        <Header>
          {loading ? (
            <LoadingDots />
          ) : lastQuery ? (
            <LastQuestion>{lastQuery}</LastQuestion>
          ) : (
            <div></div>
          )}

          <CloseButton
            shouldAllowMouseForwarding={false}
            disappearing={true}
            onClick={handleCloseButton}
          >
            <X size={10} />
          </CloseButton>
        </Header>
        {!loading && (
          <MarkdownPreview
            source={answer}
            style={{ fontSize: "0.7rem", background: "transparent" }}
          />
        )}
      </AnswerArea>
      {chatStep === STEPS.FOLLOWUP && (
        <InputBox makeQuery={makeQuery} fixed={false} coords={coords} />
      )}
    </Container>
  );
};

const Container = styled.div`
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

const AnswerArea = styled.div`
  padding: 10px 4px;
  max-height: 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LastQuestion = styled.div`
  background-color: rgba(74, 74, 74, 0.3);
  border-radius: 4px;
  padding: 5px 10px;
`;

const CloseButton = styled(IconButton)`
  background-color: rgba(74, 74, 74, 0.3);
  border-radius: 50%;
  &:hover {
    background-color: rgba(74, 74, 74, 0.3);
  }
`;

export default AnswerBox;
