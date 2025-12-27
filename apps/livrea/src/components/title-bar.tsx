"use client";

import {style} from "@react-spectrum/s2/style" with {type: "macro"};
import {getCurrentWindow} from "@tauri-apps/api/window";
import {platform} from "@tauri-apps/plugin-os";
import {useEffect, useState} from "react";
import {useAsyncValue} from "react-router";
import useTitle from "@/hooks/useTitle";

const TitleBar = () => {
   const appWindow = getCurrentWindow();
   const [isMaximized, setIsMaximized] = useState(false);
   const [currentPlatform, setCurrentPlatform] = useState<string>("");
   const platformName = platform();

   useEffect(() => {
      // Get platform
      setCurrentPlatform(platformName);

      // Listen for maximize/unmaximize events
      const unlistenResize = appWindow.onResized(async () => {
         const maximized = await appWindow.isMaximized();
         //setIsMaximized(maximized);
      });

      // Check initial maximize state
      // appWindow.isMaximized().then(setIsMaximized);

      return () => {
         unlistenResize.then((fn) => fn());
      };
   }, [platformName, appWindow.isMaximized, appWindow.onResized]);

   const handleMinimize = async () => {
      await appWindow.minimize();
   };

   const handleClose = async () => {
      await appWindow.close();
   };

   const titleBarStyle = style({
      alignItems: "center",
      display: "flex",
      height: 52,
      justifyContent: "space-between",
      paddingX: 16,
      position: "fixed",
      right: 0,
      top: 0,
      userSelect: "none",
      width: "100%",
      zIndex: 9999,
   });

   const dragRegionStyle = style({
      alignItems: "start",
      display: "flex",
      flexGrow: 1,
      font: "ui-xs",
      height: "full",
      justifyContent: "center",
      paddingTop: 16,
   });

   const titleStyle = style({
      fontSize: "body-sm",
      fontWeight: "medium",
      letterSpacing: "tight",
      textTransform: "capitalize",
   });

   const title = useTitle();
   const appName: string | undefined = useAsyncValue() as unknown as string;

   // Don't show controls on macOS (uses native traffic lights)
   if (currentPlatform === "macos") {
      return (
         <div className={titleBarStyle}>
            <div className={dragRegionStyle} data-tauri-drag-region>
               <span className={titleStyle}>
                  {appName || "Livrea"} | {title}
               </span>
            </div>
         </div>
      );
   }

   return (
      <div className={titleBarStyle}>
         {/* Draggable region */}
         <div className={dragRegionStyle} data-tauri-drag-region>
            <span className={titleStyle}>Livrea</span>
         </div>
      </div>
   );
};

export default TitleBar;
