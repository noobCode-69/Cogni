import { useAtom } from "jotai";
import { abortControllerAtom } from "../atoms/abortAtom";

export const useAbortController = () => {
  const [abortController, setAbortController] = useAtom(abortControllerAtom);

  const createNewController = () => {
    const controller = new AbortController();
    setAbortController(controller);
    return controller;
  };

  const abort = () => {
    abortController?.abort();
    setAbortController(null);
  };

  const reset = () => setAbortController(null);

  return {
    abortController,
    createNewController,
    abort,
    reset,
  };
};
