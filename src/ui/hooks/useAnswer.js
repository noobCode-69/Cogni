import { useAtom } from "jotai";
import { isLoadingAtom, answerAtom, errorAtom } from "../atoms/answerAtom";

export const useAnswer = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [error, setError] = useAtom(errorAtom);

  return {
    isLoading,
    answer,
    setIsLoading,
    setAnswer,
    error,
    setError,
  };
};
