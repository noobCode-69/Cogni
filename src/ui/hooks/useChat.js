import { useAtom } from "jotai";
import { chatStepAtom } from "../atoms/chatAtom";
import { useEffect, useRef } from "react";

export const useChat = () => {
  const [chatStep, setChatStep] = useAtom(chatStepAtom);
  const chatStepRef = useRef(chatStep);

  useEffect(() => {
    chatStepRef.current = chatStep;
  }, [chatStep]);

  return { chatStep, chatStepRef, setChatStep };
};
