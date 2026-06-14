"use client";

import { useEffect } from "react";
import { VideoFeedScroller } from "@/components/video";
import { useVideo } from "@/hooks/useVideo";

export default function VideoFeedPage() {
  const { feed, isLoading, fetchFeed } = useVideo();

  useEffect(() => {
    void fetchFeed();
    // Mount-only fetch; fetchFeed identity changes each render from useVideo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && feed.length === 0) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center text-sm text-white/70">
        Không có video để hiển thị.
      </div>
    );
  }

  return (
    <div className="h-full min-h-0">
      <VideoFeedScroller videos={feed} />
    </div>
  );
}
