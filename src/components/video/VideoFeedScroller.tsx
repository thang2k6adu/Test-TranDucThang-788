"use client";

import type { VideoFeedItem } from "@/types/video";
import { useVideo } from "@/hooks/useVideo";
import { VideoCard } from "./VideoCard";

interface VideoFeedScrollerProps {
  videos: VideoFeedItem[];
}

export function VideoFeedScroller({ videos }: VideoFeedScrollerProps) {
  const { isLiked, toggleLike, likingVideoId } = useVideo();

  return (
    <div className="h-full w-full overflow-y-auto overscroll-y-contain scroll-smooth snap-y snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
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
