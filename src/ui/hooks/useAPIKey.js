import { useAtom } from "jotai";
import { apiKeyAtom } from "../atoms/apiKeyAtom";

export const useAPIKey = () => {
  const [apiKey, setAPIKey] = useAtom(apiKeyAtom);

  return { apiKey, setAPIKey };
};
