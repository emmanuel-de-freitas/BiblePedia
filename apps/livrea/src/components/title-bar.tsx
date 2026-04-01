"use client";

import { useEffect, useState } from "react";

import useTitle from "@/hooks/useTitle";

const TitleBar = () => {
  const [currentPlatform, setCurrentPlatform] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const title = useTitle();

  useEffect(() => {
    setIsMounted(true);

    // Only run Tauri APIs on client side
    if (typeof window === "undefined") return;

    let cleanup: (() => void) | undefined;

    const initTauri = async () => {
      try {
        // Dynamically import Tauri APIs to avoid SSR issues
        const { getCurrentWindow } = await import("@tauri-apps/api/window");
        const { platform } = await import("@tauri-apps/plugin-os");

        const appWindow = getCurrentWindow();
        const platformName = platform();
        setCurrentPlatform(platformName);

        // Listen for maximize/unmaximize events
        const unlistenResize = await appWindow.onResized(async () => {
          // const maximized = await appWindow.isMaximized();
          // Handle maximize state if needed
        });

        cleanup = () => {
          unlistenResize();
        };
      } catch (error) {
        // Tauri APIs not available (running in browser)
        console.debug("Tauri APIs not available:", error);
      }
    };

    initTauri();

    return () => {
      cleanup?.();
    };
  }, []);

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed right-0 top-0 z-[9999] flex h-[52px] w-full select-none items-center justify-between px-4">
        <div
          className="flex h-full flex-grow items-start justify-center pt-4 text-xs"
          data-tauri-drag-region
        >
          <span className="text-sm font-medium capitalize tracking-tight">
            Livrea
          </span>
        </div>
      </div>
    );
  }

  // Don't show controls on macOS (uses native traffic lights)
  if (currentPlatform === "macos") {
    return (
      <div className="fixed right-0 top-0 z-[9999] flex h-[52px] w-full select-none items-center justify-between px-4">
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
  }

  return (
    <div className="fixed right-0 top-0 z-[9999] flex h-[52px] w-full select-none items-center justify-between px-4">
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
