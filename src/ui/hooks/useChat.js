import { useAtom } from "jotai";
import { chatStepAtom, globalInputValueAtom } from "../atoms/chatAtom";
import { useEffect, useRef } from "react";

export const useChat = () => {
  const [chatStep, setChatStep] = useAtom(chatStepAtom);
  const [globalInputValue, setGlobalInputValue] = useAtom(globalInputValueAtom);
  const chatStepRef = useRef(chatStep);

  useEffect(() => {
    chatStepRef.current = chatStep;
  }, [chatStep]);

  return {
    chatStep,
    chatStepRef,
    setChatStep,
    globalInputValue,
    setGlobalInputValue,
  };
};
