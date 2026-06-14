import { createAsyncThunk } from "@reduxjs/toolkit";
import { videoService } from "@/services/videoService";
import type { RootState } from "@/store";
import type { ApiResponse, PaginatedApiResponse } from "@/types/common/api";
import type { LikeVideoData, VideoFeedItem } from "@/types/video";
import { apiFailureMessage } from "@/utils/apiEnvelope";

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    return response?.data?.message || fallback;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export interface FetchVideoFeedArgs {
  page?: number;
  size?: number;
  append?: boolean;
  force?: boolean;
  ttlMs?: number;
}

export const getVideoFeedParamsKey = (args?: FetchVideoFeedArgs): string =>
  JSON.stringify({
    page: args?.page ?? 1,
    size: args?.size ?? 10,
  });

export const fetchVideoFeedThunk = createAsyncThunk<
  PaginatedApiResponse<VideoFeedItem>,
  FetchVideoFeedArgs | undefined,
  { rejectValue: string; state: RootState }
>(
  "video/fetchFeed",
  async (args, { rejectWithValue }) => {
    try {
      const res = await videoService.getFeed({
        page: args?.page,
        size: args?.size,
      });
      if (res.error || !Array.isArray(res.data)) {
        return rejectWithValue(apiFailureMessage(res));
      }
      return res;
    } catch (error: unknown) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch video feed"),
      );
    }
  },
  {
    condition: (args, { getState }) => {
      if (args?.append) {
        return !getState().video.isLoadingMore;
      }

      const state = getState().video;
      const force = args?.force ?? false;
      const requestedTtlMs = args?.ttlMs;

      if (force || state.isInvalidated) {
        return true;
      }

      if (state.isLoading) {
        return false;
      }

      if (state.feed.length === 0 || !state.lastFetchedAt) {
        return true;
      }

      if (state.lastParamsKey !== getVideoFeedParamsKey(args)) {
        return true;
      }

      const effectiveTtlMs = requestedTtlMs ?? state.ttlMs;
      const isExpired = Date.now() - state.lastFetchedAt >= effectiveTtlMs;

      return isExpired;
    },
  },
);

export const fetchVideoByIdThunk = createAsyncThunk<
  ApiResponse<VideoFeedItem>,
  string,
  { rejectValue: string }
>("video/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await videoService.getById(id);
    if (res.error || !res.data) {
      return rejectWithValue(apiFailureMessage(res));
    }
    return res;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch video"));
  }
});

export const likeVideoThunk = createAsyncThunk<
  ApiResponse<LikeVideoData>,
  string,
  { rejectValue: string }
>("video/like", async (id, { rejectWithValue }) => {
  try {
    const res = await videoService.like(id);
    if (res.error || !res.data) {
      return rejectWithValue(apiFailureMessage(res));
    }
    return res;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, "Failed to like video"));
  }
});

export const unlikeVideoThunk = createAsyncThunk<
  ApiResponse<LikeVideoData>,
  string,
  { rejectValue: string }
>("video/unlike", async (id, { rejectWithValue }) => {
  try {
    const res = await videoService.unlike(id);
    if (res.error || !res.data) {
      return rejectWithValue(apiFailureMessage(res));
    }
    return res;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, "Failed to unlike video"));
  }
});
