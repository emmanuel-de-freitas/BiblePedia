"use client";

import { useEffect, useState } from "react";

import useTitle from "@/hooks/useTitle";

const TitleBar = () => {
  const [currentPlatform, setCurrentPlatform] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const title = useTitle();

  useEffect(() => {
    setIsMounted(true);

    let cleanup: (() => void) | undefined;

    return () => {
      cleanup?.();
    };
  }, []);

  // Don't show controls on macOS (uses native traffic lights)
  if (currentPlatform === "macos") {
    return (
      <div className="fixed right-0 top-0 z-[9999] flex h-[52px] w-full select-none items-center justify-between px-4 electrobun-webkit-app-region-drag">
        <div
          className="flex h-full flex-grow items-start justify-center pt-4 text-xs"
          data-tauri-drag-region
        >
          <span className="text-sm font-medium capitalize tracking-tight">
            Biblepedia | {title}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 z-[9999] flex h-[52px] w-full select-none items-center justify-between px-4 electrobun-webkit-app-region-drag">
      {/* Draggable region */}
      <div
        className="flex h-full flex-grow items-start justify-center pt-4 text-xs"
        data-tauri-drag-region
      >
        <span className="text-sm font-medium capitalize tracking-tight">
          Livrea | {title}
        </span>
      </div>
    </div>
  );
};

export default TitleBar;
