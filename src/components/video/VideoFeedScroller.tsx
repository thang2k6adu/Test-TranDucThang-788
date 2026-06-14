"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoFeedItem } from "@/types/video";
import { useVideo } from "@/hooks/useVideo";
import { VideoCard } from "./VideoCard";

interface VideoFeedScrollerProps {
  videos: VideoFeedItem[];
}

const VISIBILITY_THRESHOLD = 0.6;

export function VideoFeedScroller({ videos }: VideoFeedScrollerProps) {
  const { isLiked, toggleLike, likingVideoId } = useVideo();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    videos[0]?.id ?? null,
  );

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, videos.length);
  }, [videos.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || videos.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;

        for (const entry of entries) {
          if (
            !entry.isIntersecting ||
            entry.intersectionRatio < VISIBILITY_THRESHOLD
          ) {
            continue;
          }

          if (
            !bestEntry ||
            entry.intersectionRatio > bestEntry.intersectionRatio
          ) {
            bestEntry = entry;
          }
        }

        if (!bestEntry) {
          return;
        }

        const videoId = bestEntry.target.getAttribute("data-video-id");
        if (videoId) {
          setActiveVideoId(videoId);
        }
      },
      {
        root: scroller,
        threshold: [0, 0.25, 0.5, VISIBILITY_THRESHOLD, 0.75, 1],
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div
      ref={scrollerRef}
      className="h-full w-full overflow-y-auto overscroll-y-contain scroll-smooth snap-y snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          ref={(element) => {
            cardRefs.current[index] = element;
          }}
          video={video}
          isActive={video.id === activeVideoId}
          isLiked={isLiked(video.id)}
          isLiking={likingVideoId === video.id}
          onToggleLike={() => {
            void toggleLike(video.id);
          }}
        />
      ))}
    </div>
  );
}
