import { useChat } from "../../hooks/useChat";
import { STEPS } from "../../atoms/chatAtom";
import InputBox from "./InputBox";
import AnswerBox from "./AnswerBox";

const StepRenderer = ({ coords, makeQuery }) => {
  const { chatStep } = useChat();

  switch (chatStep) {
    case STEPS.INPUT:
      return <InputBox fixed coords={coords} makeQuery={makeQuery} />;
    case STEPS.ANSWER:
    case STEPS.FOLLOWUP:
      return <AnswerBox coords={coords} makeQuery={makeQuery} />;
    default:
      return null;
  }
};

export default StepRenderer;
