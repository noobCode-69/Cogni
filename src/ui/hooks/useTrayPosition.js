import { useAtom } from "jotai";
import { trayPostionAtom } from "../atoms/trayPositionAtom";

export const useTrayPosition = () => {
  const [trayPosition, setTrayPosition] = useAtom(trayPostionAtom);
  return { trayPosition, setTrayPosition };
};
