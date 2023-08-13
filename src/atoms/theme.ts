"use client";

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { constrainedMemory } from "process";

export type ThemeValues = "light" | "dark" | "system";

function processDocumentClass(themeValue: ThemeValues) {
  if (typeof window !== "undefined") {
    if (
      themeValue === "dark" ||
      (themeValue === "system" &&
        window?.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
}

const themeAtomCreator = () => {
  const derivedSwitcher = atom(
    ((typeof localStorage !== "undefined" && localStorage.getItem("theme")) ||
      "system") as ThemeValues,
    (_, set, update: ThemeValues) => {
      typeof localStorage !== "undefined" &&
        localStorage.setItem("theme", update);
      processDocumentClass(update);
      set(derivedSwitcher, update);
    }
  );

  return derivedSwitcher;
};

export const themeAtom = themeAtomCreator();
