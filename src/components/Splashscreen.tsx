import React, { useEffect, useState } from 'react';
import { listenToSplashscreenStatus, type SplashscreenStatus } from '../services/splashscreen';

/**
 * Splashscreen React component
 * This is an example component that can be used as the splashscreen page
 */
export function Splashscreen() {
  const [status, setStatus] = useState<SplashscreenStatus>({
    message: 'Loading...',
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
        console.error('Failed to setup splashscreen listener:', error);
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
    <div className="splashscreen">
      <style>{`
        .splashscreen {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          overflow: hidden;
          position: relative;
        }

        .splashscreen::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.05) 35px,
            rgba(255, 255, 255, 0.05) 70px
          );
          pointer-events: none;
        }

        .splashscreen-content {
          text-align: center;
          z-index: 1;
          animation: fadeIn 0.5s ease-in;
        }

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

        .logo {
          width: 120px;
          height: 120px;
          margin: 0 auto 30px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .logo svg {
          width: 70px;
          height: 70px;
          fill: #667eea;
        }

        .title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -1px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .tagline {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          margin-bottom: 40px;
          font-weight: 400;
        }

        .loading-container {
          margin-top: 40px;
        }

        .loading-bar {
          width: 240px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          margin: 0 auto 15px;
          overflow: hidden;
          position: relative;
        }

        .loading-progress {
          height: 100%;
          background: white;
          border-radius: 2px;
          width: ${status.progress || 0}%;
          transition: width 0.3s ease;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin-top: 15px;
          font-weight: 500;
        }

        .version {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
        }
      `}</style>

      <div className="splashscreen-content">
        <div className="logo">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 2h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
          </svg>
        </div>

        <h1 className="title">Livrea</h1>
        <p className="tagline">Your Digital Library</p>

        <div className="loading-container">
          <div className="loading-bar">
            <div className="loading-progress" />
          </div>
          <div className="loading-spinner" />
          <p className="loading-text">{status.message}</p>
        </div>
      </div>

      <div className="version">v0.1.0</div>
    </div>
  );
}

export default Splashscreen;
