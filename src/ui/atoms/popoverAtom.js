import { atom } from "jotai";
import { useAtom } from "jotai";
import { getDefaultStore } from "jotai";

export const popoverAtom = atom(null);
const store = getDefaultStore();

export const usePopover = (id) => {
  const [openPopoverId, setOpenPopoverId] = useAtom(popoverAtom);

  const isOpen = openPopoverId === id;

  const toggle = () => {
    setOpenPopoverId((prev) => (prev === id ? null : id));
  };

  return { isOpen, toggle };
};

export const closeAllPopovers = () => {
  store.set(popoverAtom, null);
};
