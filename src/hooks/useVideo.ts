"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchVideoFeedThunk,
  fetchVideoByIdThunk,
  likeVideoThunk,
  unlikeVideoThunk,
  type FetchVideoFeedArgs,
} from "@/store/thunks/videoThunks";
import {
  clearError,
  clearSelectedVideo,
  resetFeed,
} from "@/store/slices/videoSlice";
import toast from "react-hot-toast";

const isConditionSkip = (action: { meta?: { condition?: boolean } }) =>
  Boolean(action.meta?.condition);

export const useVideo = () => {
  const dispatch = useAppDispatch();
  const {
    feed,
    selectedVideo,
    likedVideoIds,
    isLoading,
    isLoadingMore,
    isLoadingDetail,
    likingVideoId,
    error,
    total,
    page,
    size,
  } = useAppSelector((state) => state.video);

  const fetchFeed = async (options?: FetchVideoFeedArgs) => {
    const result = await dispatch(fetchVideoFeedThunk(options));
    if (
      fetchVideoFeedThunk.rejected.match(result) &&
      !isConditionSkip(result)
    ) {
      toast.error(result.payload || "Failed to fetch video feed");
    }
    return result;
  };

  const fetchById = async (id: string) => {
    const result = await dispatch(fetchVideoByIdThunk(id));
    if (fetchVideoByIdThunk.rejected.match(result)) {
      toast.error(result.payload || "Failed to fetch video");
    }
    return result;
  };

  const like = async (id: string) => {
    const result = await dispatch(likeVideoThunk(id));
    if (likeVideoThunk.rejected.match(result)) {
      toast.error(result.payload || "Failed to like video");
    }
    return result;
  };

  const unlike = async (id: string) => {
    const result = await dispatch(unlikeVideoThunk(id));
    if (unlikeVideoThunk.rejected.match(result)) {
      toast.error(result.payload || "Failed to unlike video");
    }
    return result;
  };

  const toggleLike = async (id: string) => {
    if (likedVideoIds[id]) {
      return unlike(id);
    }
    return like(id);
  };

  const loadMore = async () => {
    if (isLoadingMore || feed.length >= total) {
      return;
    }
    return fetchFeed({ page: page + 1, size, append: true });
  };

  const clearVideoError = () => {
    dispatch(clearError());
  };

  const clearSelected = () => {
    dispatch(clearSelectedVideo());
  };

  const resetVideoFeed = () => {
    dispatch(resetFeed());
  };

  const isLiked = (id: string) => Boolean(likedVideoIds[id]);

  const hasMore = feed.length < total;

  return {
    feed,
    selectedVideo,
    likedVideoIds,
    isLoading,
    isLoadingMore,
    isLoadingDetail,
    likingVideoId,
    error,
    total,
    page,
    size,
    hasMore,
    fetchFeed,
    fetchById,
    like,
    unlike,
    toggleLike,
    loadMore,
    clearError: clearVideoError,
    clearSelectedVideo: clearSelected,
    resetFeed: resetVideoFeed,
    isLiked,
  };
};
