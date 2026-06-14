import apiClient from "@/utils/api";
import { API_ENDPOINTS } from "@/constants";
import type { ApiResponse, PaginatedApiResponse } from "@/types/common/api";
import type { LikeVideoData, VideoFeedItem } from "@/types/video";
import { videoMockApi } from "@/mocks/video";

export type { ApiResponse } from "@/types/common/api";

export interface GetVideosParams {
  page?: number;
  size?: number;
}

const useMockVideoApi = process.env.NEXT_PUBLIC_USE_MOCK_VIDEO_API !== "false";

export const videoService = {
  getFeed: (
    params?: GetVideosParams,
  ): Promise<PaginatedApiResponse<VideoFeedItem>> =>
    useMockVideoApi
      ? videoMockApi.getFeed(params)
      : apiClient.get<PaginatedApiResponse<VideoFeedItem>>(
          API_ENDPOINTS.VIDEOS.FEED,
          { params },
        ),

  getById: (id: string): Promise<ApiResponse<VideoFeedItem>> =>
    useMockVideoApi
      ? videoMockApi.getById(id)
      : apiClient.get<ApiResponse<VideoFeedItem>>(
          API_ENDPOINTS.VIDEOS.DETAIL(id),
        ),

  like: (id: string): Promise<ApiResponse<LikeVideoData>> =>
    useMockVideoApi
      ? videoMockApi.like(id)
      : apiClient.post<ApiResponse<LikeVideoData>>(
          API_ENDPOINTS.VIDEOS.LIKE(id),
          {},
        ),

  unlike: (id: string): Promise<ApiResponse<LikeVideoData>> =>
    useMockVideoApi
      ? videoMockApi.unlike(id)
      : apiClient.delete<ApiResponse<LikeVideoData>>(
          API_ENDPOINTS.VIDEOS.LIKE(id),
        ),
};
