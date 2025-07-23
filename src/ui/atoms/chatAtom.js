import { atom } from "jotai";

export const STEPS = {
  INPUT: "INPUT",
  ANSWER: "ANSWER",
  FOLLOWUP: "FOLLOWUP",
};

export const chatStepAtom = atom(STEPS.INPUT);
