"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  isActive?: boolean;
  className?: string;
}

interface PlayPauseIndicator {
  id: number;
  playing: boolean;
}

type VideoFitMode = "cover" | "contain";

const FRAME_ASPECT_RATIO = 9 / 16;

const getVideoFitMode = (width: number, height: number): VideoFitMode => {
  if (width <= 0 || height <= 0) {
    return "cover";
  }

  const videoAspectRatio = width / height;

  if (videoAspectRatio > FRAME_ASPECT_RATIO * 1.05) {
    return "contain";
  }

  return "cover";
};

export function VideoPlayer({
  src,
  isActive = false,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [indicator, setIndicator] = useState<PlayPauseIndicator | null>(null);
  const [fitMode, setFitMode] = useState<VideoFitMode>("cover");

  const showIndicator = useCallback((playing: boolean) => {
    setIndicator({ id: Date.now(), playing });
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    setFitMode(getVideoFitMode(video.videoWidth, video.videoHeight));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (isActive) {
      void video.play().catch(() => setIsPlaying(false));
      return;
    }

    video.pause();
  }, [isActive]);

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
      {fitMode === "contain" && (
        <video
          aria-hidden
          src={src}
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
          loop
          playsInline
          muted
          preload="metadata"
          tabIndex={-1}
        />
      )}

      <video
        ref={videoRef}
        src={src}
        className={cn(
          "relative z-10 h-full w-full",
          fitMode === "cover" ? "object-cover" : "object-contain",
        )}
        loop
        playsInline
        muted
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {indicator !== null && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
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
