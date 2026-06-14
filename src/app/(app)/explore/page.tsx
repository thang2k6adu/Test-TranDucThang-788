import type { Metadata } from "next";
import VideoFeedPage from "@/views/VideoFeed/VideoFeedPage";

export const metadata: Metadata = {
  title: "Khám phá",
};

export default function ExplorePage() {
  return <VideoFeedPage />;
}
