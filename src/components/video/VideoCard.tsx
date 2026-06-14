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
    return (
      <article
        ref={ref}
        data-video-id={video.id}
        className="relative flex h-full min-h-full w-full shrink-0 snap-start snap-always items-center justify-center bg-black"
      >
        <div className="flex h-full items-end gap-3 py-2 md:gap-4 md:py-2">
          <VideoFrame>
            <VideoPlayer src={video.videoUrl} isActive={isActive} />
            <VideoOverlay
              authorName={video.authorName}
              description={video.description}
            />
          </VideoFrame>

          <VideoActionRail
            likesCount={video.likesCount}
            isLiked={isLiked}
            isLiking={isLiking}
            onToggleLike={onToggleLike}
          />
        </div>
      </article>
    );
  },
);
