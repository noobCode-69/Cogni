import { atom } from "jotai";
import { useAtom } from "jotai";

export const trayPostionAtom = atom(0);

export const useTrayPosition = (id) => {
  const [trayPosition, setTrayPosition] = useAtom(trayPostionAtom);

  return { trayPosition, setTrayPosition };
};
