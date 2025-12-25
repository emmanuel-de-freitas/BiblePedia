import { useEffect, useState } from 'react';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { listenToSplashscreenStatus, type SplashscreenStatus } from '../services/splashscreen';
import { ProgressCircle } from '@react-spectrum/s2';

/**
 * Splashscreen React component using React Spectrum style macro
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
    <div
      className={style({
        width: 'screen',
        height: 'screen',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
      })}
    >
      {/* Pattern overlay */}
      <div
        className={style({
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.05) 35px, rgba(255, 255, 255, 0.05) 70px)',
          pointerEvents: 'none',
        })}
      />

      {/* Content container with fade-in animation */}
      <div
        className={style({
          textAlign: 'center',
          zIndex: 1,
        })}
        style={{ animation: 'fadeIn 0.5s ease-in' }}
      >
        {/* Logo with pulse animation */}
        <div
          className={style({
            size: 120,
            marginX: 'auto',
            marginBottom: 32,
            backgroundColor: 'transparent-white-900',
            borderRadius: 'xl',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'elevated',
          })}
          style={{ animation: 'pulse 2s ease-in-out infinite' }}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={style({
              size: 64,
              fill: 'indigo',
            })}
          >
            <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 2h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
          </svg>
        </div>

        {/* Title */}
        <h1
          className={style({
            font: 'heading-3xl',
            marginBottom: 8,
            color: 'white',
          })}
        >
          Livrea
        </h1>

        {/* Tagline */}
        <p
          className={style({
            color: 'transparent-white-900',
            font: 'body-lg',
            marginBottom: 40,
          })}
        >
          Your Digital Library
        </p>

        {/* Loading container */}
        <div
          className={style({
            marginTop: 40,
          })}
        >
          {/* Progress bar */}
          <div
            className={style({
              width: 240,
              height: 4,
              backgroundColor: 'transparent-white-200',
              borderRadius: 'sm',
              marginX: 'auto',
              marginBottom: 16,
              overflow: 'hidden',
              position: 'relative',
            })}
          >
            <div
              className={style({
                height: 'full',
                backgroundColor: 'white',
                borderRadius: 'sm',
                boxShadow: 'elevated',
                transition: 'default',
              })}
              style={{ width: `${status.progress || 0}%` }}
            />
          </div>

          {/* Loading spinner */}
          <ProgressCircle
            aria-label="Loading…"
            value={50}
            isIndeterminate
            staticColor="auto" />

          {/* Status text */}
          <p
            className={style({
              color: 'transparent-white-900',
              font: 'body-sm',
              marginTop: 16,
              fontWeight: 'medium',
            })}
          >
            {status.message}
          </p>
        </div>
      </div>

      {/* Version */}
      <div
        className={style({
          position: 'absolute',
          bottom: 20,
          color: 'transparent-white-600',
          font: 'detail-sm',
        })}
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
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
