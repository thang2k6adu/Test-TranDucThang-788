"use client";

import { useCallback, useRef, useState } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }

      setShowIndicator(true);
      window.setTimeout(() => setShowIndicator(false), 600);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  return (
    <div
      className={cn("relative h-full w-full bg-black", className)}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? "Pause video" : "Play video"}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          void togglePlay();
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-cover"
        loop
        playsInline
        muted
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300",
          showIndicator ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
          {isPlaying ? (
            <LuPause className="size-8 fill-white" />
          ) : (
            <LuPlay className="size-8 fill-white" />
          )}
        </div>
      </div>
    </div>
  );
}
