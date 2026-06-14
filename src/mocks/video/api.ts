import type { ApiResponse, PaginatedApiResponse } from "@/types/common/api";
import type { LikeVideoData, VideoFeedItem } from "@/types/video";
import { mockVideos } from "./data";

const MOCK_TRACE_ID = "mock-trace-id";

const likedVideoIds = new Set<string>();
const likesCountOverrides = new Map<string, number>();

function getLikesCount(video: VideoFeedItem): number {
  return likesCountOverrides.get(video.id) ?? video.likesCount;
}

function createApiResponse<T>(data: T): ApiResponse<T> {
  return {
    error: false,
    code: 200,
    message: "OK",
    data,
    traceId: MOCK_TRACE_ID,
  };
}

function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

export interface MockGetVideosParams {
  page?: number;
  size?: number;
}

export const videoMockApi = {
  getFeed: async (
    params?: MockGetVideosParams,
  ): Promise<PaginatedApiResponse<VideoFeedItem>> => {
    const page = params?.page ?? 1;
    const size = params?.size ?? mockVideos.length;
    const start = (page - 1) * size;
    const items = mockVideos.slice(start, start + size).map((video) => ({
      ...video,
      likesCount: getLikesCount(video),
    }));

    return delay({
      ...createApiResponse(items),
      meta: {
        itemCount: items.length,
        totalItems: mockVideos.length,
        itemsPerPage: size,
        totalPages: Math.max(1, Math.ceil(mockVideos.length / size)),
        currentPage: page,
      },
    });
  },

  getById: async (id: string): Promise<ApiResponse<VideoFeedItem>> => {
    const video = mockVideos.find((item) => item.id === id);

    if (!video) {
      return delay({
        error: true,
        code: 404,
        message: "Video not found",
        data: null,
        traceId: MOCK_TRACE_ID,
      });
    }

    return delay(
      createApiResponse({
        ...video,
        likesCount: getLikesCount(video),
      }),
    );
  },

  like: async (id: string): Promise<ApiResponse<LikeVideoData>> => {
    const video = mockVideos.find((item) => item.id === id);

    if (!video) {
      return delay({
        error: true,
        code: 404,
        message: "Video not found",
        data: null,
        traceId: MOCK_TRACE_ID,
      });
    }

    const wasLiked = likedVideoIds.has(id);
    const currentLikes = getLikesCount(video);
    const nextLikes = wasLiked ? currentLikes : currentLikes + 1;

    likedVideoIds.add(id);
    likesCountOverrides.set(id, nextLikes);

    return delay(
      createApiResponse({
        videoId: id,
        likesCount: nextLikes,
        liked: true,
      }),
    );
  },

  unlike: async (id: string): Promise<ApiResponse<LikeVideoData>> => {
    const video = mockVideos.find((item) => item.id === id);

    if (!video) {
      return delay({
        error: true,
        code: 404,
        message: "Video not found",
        data: null,
        traceId: MOCK_TRACE_ID,
      });
    }

    const wasLiked = likedVideoIds.has(id);
    const currentLikes = getLikesCount(video);
    const nextLikes = wasLiked ? Math.max(0, currentLikes - 1) : currentLikes;

    likedVideoIds.delete(id);
    likesCountOverrides.set(id, nextLikes);

    return delay(
      createApiResponse({
        videoId: id,
        likesCount: nextLikes,
        liked: false,
      }),
    );
  },
};
