"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import type { VideoFeedItem } from "@/types/video";
import { useVideo } from "@/hooks/useVideo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VideoCard } from "./VideoCard";

interface VideoFeedScrollerProps {
  videos: VideoFeedItem[];
}

export function VideoFeedScroller({ videos }: VideoFeedScrollerProps) {
  const { isLiked, toggleLike, likingVideoId } = useVideo();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.6) {
            return;
          }

          const index = cardRefs.current.findIndex(
            (card) => card === entry.target,
          );

          if (index >= 0) {
            setActiveIndex(index);
          }
        });
      },
      {
        root: scroller,
        threshold: [0.6],
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [videos]);

  const scrollToIndex = useCallback((index: number) => {
    const card = cardRefs.current[index];
    card?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const canScrollUp = activeIndex > 0;
  const canScrollDown = activeIndex < videos.length - 1;

  return (
    <div className="relative h-full w-full">
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
            isLiked={isLiked(video.id)}
            isLiking={likingVideoId === video.id}
            onToggleLike={() => {
              void toggleLike(video.id);
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-3 z-10 hidden items-center md:flex">
        <div className="pointer-events-auto flex flex-col gap-3">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className={cn(
              "size-10 rounded-full bg-background/80 shadow-md backdrop-blur-sm",
              !canScrollUp && "opacity-40",
            )}
            disabled={!canScrollUp}
            aria-label="Previous video"
            onClick={() => scrollToIndex(activeIndex - 1)}
          >
            <LuChevronUp className="size-5" />
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="icon"
            className={cn(
              "size-10 rounded-full bg-background/80 shadow-md backdrop-blur-sm",
              !canScrollDown && "opacity-40",
            )}
            disabled={!canScrollDown}
            aria-label="Next video"
            onClick={() => scrollToIndex(activeIndex + 1)}
          >
            <LuChevronDown className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
