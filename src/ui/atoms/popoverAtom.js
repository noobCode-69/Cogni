import { atom } from "jotai";
import { getDefaultStore } from "jotai";

export const popoverAtom = atom(null);
const store = getDefaultStore();

export const closeAllPopovers = () => {
  store.set(popoverAtom, null);
};
