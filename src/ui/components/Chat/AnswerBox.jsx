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

const AnswerBox = ({ coords, makeQuery }) => {
  const { chatStep } = useChat();
  const { answer, isLoading, lastQuery } = useAnswer();
  const loading = isLoading && !answer;

  return (
    <Container top={coords.top}>
      <AnswerArea>
        <Header>
          {loading ? (
            <LoadingDots />
          ) : (
            lastQuery && <LastQuestion>{lastQuery}</LastQuestion>
          )}
          <CloseButton disappearing={true} onClick={closeAllPopovers}>
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

export default AnswerBox;

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
