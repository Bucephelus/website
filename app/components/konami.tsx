"use client";

import { useEffect, useRef } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function Konami() {
  const pos = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[pos.current]) {
        pos.current++;
        if (pos.current === KONAMI.length) {
          pos.current = 0;
          document.body.classList.add("konami-flip");
          setTimeout(() => document.body.classList.remove("konami-flip"), 3000);
        }
      } else {
        pos.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
