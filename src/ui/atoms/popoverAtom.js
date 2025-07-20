import { atom } from "jotai";
import { useAtom } from "jotai";
import { getDefaultStore } from "jotai";
import { useEffect, useRef } from "react";

export const popoverAtom = atom(null);
const store = getDefaultStore();

export const usePopover = (id) => {
  const [openPopoverId, setOpenPopoverId] = useAtom(popoverAtom);

  const isOpen = openPopoverId === id;
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const toggle = () => {
    setOpenPopoverId((prev) => (prev === id ? null : id));
  };
  return { isOpen, toggle, isOpenRef };
};

export const closeAllPopovers = () => {
  store.set(popoverAtom, null);
};
