"use client";

import { ProgressCircle } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useEffect, useState } from "react";
import { listenToSplashscreenStatus, type SplashscreenStatus } from "@/services/splashscreen";

/**
 * Splashscreen React component using React Spectrum style macro
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
      <div
         className={style({
            alignItems: "center",
            backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            height: "screen",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            width: "screen",
         })}>
         {/* Pattern overlay */}
         <div
            className={style({
               backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.05) 35px, rgba(255, 255, 255, 0.05) 70px)",
               inset: 0,
               pointerEvents: "none",
               position: "absolute",
            })}
         />

         {/* Content container with fade-in animation */}
         <div
            className={style({
               textAlign: "center",
               zIndex: 1,
            })}
            style={{ animation: "fadeIn 0.5s ease-in" }}>
            {/* Logo with pulse animation */}
            <div
               className={style({
                  alignItems: "center",
                  backgroundColor: "transparent-white-900",
                  borderRadius: "xl",
                  boxShadow: "elevated",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 32,
                  marginX: "auto",
                  size: 120,
               })}
               style={{ animation: "pulse 2s ease-in-out infinite" }}></div>

            {/* Title */}
            <h1
               className={style({
                  color: "white",
                  font: "heading-3xl",
                  marginBottom: 8,
               })}>
               Livrea
            </h1>

            {/* Tagline */}
            <p
               className={style({
                  color: "transparent-white-900",
                  font: "body-lg",
                  marginBottom: 40,
               })}>
               Your Digital Library
            </p>

            {/* Loading container */}
            <div
               className={style({
                  marginTop: 40,
               })}>
               {/* Progress bar */}
               <div
                  className={style({
                     backgroundColor: "transparent-white-200",
                     borderRadius: "sm",
                     height: 4,
                     marginBottom: 16,
                     marginX: "auto",
                     overflow: "hidden",
                     position: "relative",
                     width: 240,
                  })}>
                  <div
                     className={style({
                        backgroundColor: "white",
                        borderRadius: "sm",
                        boxShadow: "elevated",
                        height: "full",
                        transition: "default",
                     })}
                     style={{ width: `${status.progress || 0}%` }}
                  />
               </div>

               {/* Loading spinner */}
               <ProgressCircle aria-label="Loading…" value={50} isIndeterminate staticColor="auto" />

               {/* Status text */}
               <p
                  className={style({
                     color: "transparent-white-900",
                     font: "body-sm",
                     fontWeight: "medium",
                     marginTop: 16,
                  })}>
                  {status.message}
               </p>
            </div>
         </div>

         {/* Version */}
         <div
            className={style({
               bottom: 20,
               color: "transparent-white-600",
               font: "detail-sm",
               position: "absolute",
            })}
            style={{ left: "50%", transform: "translateX(-50%)" }}>
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      </div>
   );
}

export default Splashscreen;
