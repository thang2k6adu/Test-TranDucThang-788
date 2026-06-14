export interface VideoFeedItem {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
}

export interface LikeVideoData {
  videoId: string;
  likesCount: number;
  liked: boolean;
}

export type UnlikeVideoData = LikeVideoData;
