'use client'

import { style } from "@react-spectrum/s2/style" with { type: 'macro' };
import { getCurrentWindow } from '@tauri-apps/api/window';
import { platform } from '@tauri-apps/plugin-os';
import { useEffect, useState } from 'react';

const TitleBar = () => {
  const appWindow = getCurrentWindow();
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<string>('');
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
      unlistenResize.then(fn => fn());
    };
  }, [platformName]);

  const handleMinimize = async () => {
    await appWindow.minimize();
  };

  const handleClose = async () => {
    await appWindow.close();
  };

  const titleBarStyle = style({
    position: 'fixed',
    top: 0,
    right: 0,
    height: 52,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingX: 16,
    zIndex: 9999,
    userSelect: 'none'
  });

  const dragRegionStyle = style({
    flexGrow: 1,
    height: 'full',
    display: 'flex',
    font: 'ui-xs',
    justifyContent: "center",
    alignItems: 'start',
    paddingTop: 16
  });

  const titleStyle = style({
    fontSize: 'body-sm',
    fontWeight: 'medium',
    letterSpacing: 'tight',
  });

  // Don't show controls on macOS (uses native traffic lights)
  if (currentPlatform === 'macos') {
    return (
      <div className={titleBarStyle}>
        <div className={dragRegionStyle} data-tauri-drag-region>
          <span className={titleStyle}>Livrea | Dashboard</span>
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
