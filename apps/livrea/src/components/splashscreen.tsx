"use client";

import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import {
  listenToSplashscreenStatus,
  type SplashscreenStatus,
} from "@/services/splashscreen";

/**
 * Splashscreen React component using Tailwind CSS
 * This is an example component that can be used as the splashscreen page
 */
export function Splashscreen() {
  const [status, setStatus] = useState<SplashscreenStatus>({
    message: "Loading...",
    progress: 0,
  });

  useEffect(() => {
    let unlisten: (() => void) | undefined;

    const setupListener = async () => {
      try {
        unlisten = await listenToSplashscreenStatus((newStatus) => {
          setStatus(newStatus);
        });
      } catch (error) {
        console.error("Failed to setup splashscreen listener:", error);
      }
    };

    setupListener();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
      {/* Pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.05) 35px, rgba(255, 255, 255, 0.05) 70px)",
        }}
      />

      {/* Content container with fade-in animation */}
      <div className="z-10 text-center animate-fade-in">
        {/* Logo with pulse animation */}
        <div className="mx-auto mb-8 flex h-[120px] w-[120px] items-center justify-center rounded-xl bg-white/10 shadow-lg animate-pulse" />

        {/* Title */}
        <h1 className="mb-2 text-4xl font-bold text-white">Livrea</h1>

        {/* Tagline */}
        <p className="mb-10 text-lg text-white/80">Your Digital Library</p>

        {/* Loading container */}
        <div className="mt-10">
          {/* Progress bar */}
          <div className="relative mx-auto mb-4 h-1 w-60 overflow-hidden rounded-sm bg-white/20">
            <div
              className="h-full rounded-sm bg-white shadow-lg transition-all duration-300"
              style={{ width: `${status.progress || 0}%` }}
            />
          </div>

          {/* Loading spinner */}
          <Spinner size="lg" className="text-white" />

          {/* Status text */}
          <p className="mt-4 text-sm font-medium text-white/80">
            {status.message}
          </p>
        </div>
      </div>

      {/* Version */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/50">
        v0.1.0
      </div>

      {/* Global keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>
    </div>
  );
}

export default Splashscreen;
