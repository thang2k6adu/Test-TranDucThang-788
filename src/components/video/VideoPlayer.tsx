"use client";

import { useCallback, useRef, useState } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  className?: string;
}

interface PlayPauseIndicator {
  id: number;
  playing: boolean;
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [indicator, setIndicator] = useState<PlayPauseIndicator | null>(null);

  const showIndicator = useCallback((playing: boolean) => {
    setIndicator({ id: Date.now(), playing });
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      showIndicator(true);
      setIsPlaying(true);
      void video.play().catch(() => setIsPlaying(false));
      return;
    }

    video.pause();
    setIsPlaying(false);
    showIndicator(false);
  }, [showIndicator]);

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

      {indicator !== null && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            key={indicator.id}
            className="flex size-16 transform-gpu items-center justify-center rounded-full bg-black/40 text-white will-change-[transform,opacity] animate-play-pause-pop"
            onAnimationEnd={() => setIndicator(null)}
          >
            {indicator.playing ? (
              <LuPlay className="size-8 fill-white" />
            ) : (
              <LuPause className="size-8 fill-white" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
