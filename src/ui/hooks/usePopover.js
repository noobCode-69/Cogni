import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { popoverAtom } from "../atoms/popoverAtom";

export const usePopover = (id) => {
  const [openPopoverId, setOpenPopoverId] = useAtom(popoverAtom);

  const isOpen = openPopoverId === id;
  const openPopoverIdRef = useRef(openPopoverId);
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    openPopoverIdRef.current = openPopoverId;
  }, [openPopoverId]);

  const toggle = () => {
    setOpenPopoverId((prev) => (prev === id ? null : id));
  };
  return {
    isOpen,
    toggle,
    isOpenRef: isOpenRef,
    openPopoverId,
    openPopoverIdRef: openPopoverIdRef,
  };
};
