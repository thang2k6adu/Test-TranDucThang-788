"use client";

import type { VideoFeedItem } from "@/types/video";
import { VideoOverlay } from "./VideoOverlay";
import { VideoPlayer } from "./VideoPlayer";

interface VideoCardProps {
  video: VideoFeedItem;
  isLiked?: boolean;
  isLiking?: boolean;
  onToggleLike?: () => void;
}

export function VideoCard({
  video,
  isLiked,
  isLiking,
  onToggleLike,
}: VideoCardProps) {
  return (
    <article className="relative flex h-full min-h-full w-full shrink-0 snap-start snap-always items-start justify-center bg-muted pt-2 md:pt-3">
      <div className="relative aspect-[9/16] h-full max-h-full w-auto max-w-[480px] overflow-hidden rounded-xl shadow-2xl shadow-black/50">
        <VideoPlayer src={video.videoUrl} />
        <VideoOverlay
          authorName={video.authorName}
          description={video.description}
          likesCount={video.likesCount}
          isLiked={isLiked}
          isLiking={isLiking}
          onToggleLike={onToggleLike}
        />
      </div>
    </article>
  );
}
