import { useAtom } from "jotai";
import { chatStepAtom } from "../atoms/chatStepAtom";
import { useEffect, useRef } from "react";

export const useChatStep = () => {
  const [chatStep, setChatStep] = useAtom(chatStepAtom);
  const chatStepRef = useRef(chatStep);

  useEffect(() => {
    chatStepRef.current = chatStep;
  }, [chatStep]);

  return { chatStep, chatStepRef: chatStepRef, setChatStep };
};
