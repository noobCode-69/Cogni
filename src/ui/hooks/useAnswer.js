import { useAtom } from "jotai";
import {
  isLoadingAtom,
  answerAtom,
  errorAtom,
  lastQueryAtom,
} from "../atoms/answerAtom";

export const useAnswer = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [error, setError] = useAtom(errorAtom);
  const [lastQuery, setLastQuery] = useAtom(lastQueryAtom);

  return {
    isLoading,
    answer,
    setIsLoading,
    setAnswer,
    error,
    setError,
    lastQuery,
    setLastQuery,
  };
};
