"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

export function ImageLightbox(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="my-4 rounded-lg cursor-zoom-in"
        alt=""
        {...props}
        onClick={() => setOpen(true)}
      />

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center cursor-zoom-out"
            onClick={close}
            style={{ animation: "lightbox-fade-in 0.25s ease-out" }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              style={{ animation: "lightbox-fade-in 0.25s ease-out" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.src}
              alt={props.alt || ""}
              className="relative max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              style={{ animation: "lightbox-scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </>
  );
}
