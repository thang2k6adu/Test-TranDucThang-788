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
    <article className="relative flex h-full min-h-full w-full snap-start snap-always items-center justify-center bg-black">
      <div className="relative h-full w-full overflow-hidden md:h-auto md:max-h-full md:w-auto md:max-w-[480px] md:aspect-[9/16] md:rounded-xl md:shadow-2xl md:shadow-black/50">
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
