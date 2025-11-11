// FullScreenLoader.tsx
import React from "react";

interface FullScreenLoaderProps {
  visible?: boolean;            // show or hide the loader
  message?: string;             // optional message under spinner
  backdropOpacity?: number;     // 0 - 100 (percent)
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  visible = true,
  message = "Loading...",
  backdropOpacity = 50,
}) => {
  if (!visible) return null;

  const opacityClass = Math.max(0, Math.min(100, backdropOpacity));
  const bgClass = `bg-black/` + `${opacityClass}`;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={`fixed inset-0 z-50 flex items-center justify-center ${bgClass}`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <svg
          className="animate-spin -ml-1 mr-3 h-16 w-16 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>

        {/* Message */}
        <div className="text-sm text-white/90 font-medium">{message}</div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
