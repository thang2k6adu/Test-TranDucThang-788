"use client";

import { forwardRef } from "react";
import type { VideoFeedItem } from "@/types/video";
import { VideoActionRail } from "./VideoActionRail";
import { VideoFrame } from "./VideoFrame";
import { VideoOverlay } from "./VideoOverlay";
import { VideoPlayer } from "./VideoPlayer";

interface VideoCardProps {
  video: VideoFeedItem;
  isActive?: boolean;
  isLiked?: boolean;
  isLiking?: boolean;
  onToggleLike?: () => void;
}

export const VideoCard = forwardRef<HTMLElement, VideoCardProps>(
  function VideoCard(
    { video, isActive = false, isLiked, isLiking, onToggleLike },
    ref,
  ) {
    const actionRailProps = {
      likesCount: video.likesCount,
      isLiked,
      isLiking,
      onToggleLike,
    };

    return (
      <article
        ref={ref}
        data-video-id={video.id}
        className="relative flex h-full min-h-full w-full shrink-0 snap-start snap-always items-center justify-center bg-black"
      >
        <div className="relative flex h-full w-full justify-center md:items-end md:gap-4 md:py-2">
          <VideoFrame className="h-full w-full max-w-none rounded-none md:max-w-[480px] md:rounded-xl lg:max-w-[560px]">
            <VideoPlayer src={video.videoUrl} isActive={isActive} />
            <VideoOverlay
              authorName={video.authorName}
              description={video.description}
            />

            <aside className="absolute bottom-20 right-3 z-30 md:hidden">
              <VideoActionRail {...actionRailProps} compact />
            </aside>
          </VideoFrame>

          <aside className="hidden shrink-0 md:block">
            <VideoActionRail {...actionRailProps} />
          </aside>
        </div>
      </article>
    );
  },
);
