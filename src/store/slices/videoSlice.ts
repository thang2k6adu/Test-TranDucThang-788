import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LikeVideoData, VideoFeedItem } from "@/types/video";
import {
  fetchVideoFeedThunk,
  fetchVideoByIdThunk,
  likeVideoThunk,
  unlikeVideoThunk,
  getVideoFeedParamsKey,
} from "../thunks/videoThunks";

const DEFAULT_VIDEO_FEED_TTL_MS = 30_000;
const DEFAULT_VIDEO_PAGE_SIZE = 10;

interface VideoState {
  feed: VideoFeedItem[];
  selectedVideo: VideoFeedItem | null;
  likedVideoIds: Record<string, boolean>;
  isLoading: boolean;
  isLoadingMore: boolean;
  isLoadingDetail: boolean;
  likingVideoId: string | null;
  error: string | null;
  total: number;
  page: number;
  size: number;
  lastFetchedAt: number | null;
  lastParamsKey: string | null;
  ttlMs: number;
  isInvalidated: boolean;
}

const initialState: VideoState = {
  feed: [],
  selectedVideo: null,
  likedVideoIds: {},
  isLoading: false,
  isLoadingMore: false,
  isLoadingDetail: false,
  likingVideoId: null,
  error: null,
  total: 0,
  page: 1,
  size: DEFAULT_VIDEO_PAGE_SIZE,
  lastFetchedAt: null,
  lastParamsKey: null,
  ttlMs: DEFAULT_VIDEO_FEED_TTL_MS,
  isInvalidated: false,
};

const applyLikeUpdate = (state: VideoState, data: LikeVideoData) => {
  state.likedVideoIds[data.videoId] = data.liked;

  const updateItem = (item: VideoFeedItem): VideoFeedItem =>
    item.id === data.videoId ? { ...item, likesCount: data.likesCount } : item;

  state.feed = state.feed.map(updateItem);

  if (state.selectedVideo?.id === data.videoId) {
    state.selectedVideo = updateItem(state.selectedVideo);
  }
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedVideo: (state) => {
      state.selectedVideo = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFeed: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoFeedThunk.pending, (state, action) => {
        if (action.meta.arg?.append) {
          state.isLoadingMore = true;
        } else {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchVideoFeedThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;

        const incoming = action.payload.data ?? [];
        if (action.meta.arg?.append) {
          const existingIds = new Set(state.feed.map((video) => video.id));
          const merged = [...state.feed];
          for (const video of incoming) {
            if (!existingIds.has(video.id)) {
              merged.push(video);
            }
          }
          state.feed = merged;
        } else {
          state.feed = incoming;
        }

        if (action.payload.meta) {
          state.total = action.payload.meta.totalItems;
          state.page = action.payload.meta.currentPage;
          state.size = action.payload.meta.itemsPerPage;
        }

        state.lastFetchedAt = Date.now();
        state.lastParamsKey = getVideoFeedParamsKey(action.meta.arg);
        state.ttlMs = action.meta.arg?.ttlMs ?? state.ttlMs;
        state.isInvalidated = false;
      })
      .addCase(fetchVideoFeedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.error = action.payload || "Failed to fetch video feed";
      });

    builder
      .addCase(fetchVideoByIdThunk.pending, (state) => {
        state.isLoadingDetail = true;
        state.error = null;
      })
      .addCase(fetchVideoByIdThunk.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.selectedVideo = action.payload.data ?? null;
      })
      .addCase(fetchVideoByIdThunk.rejected, (state, action) => {
        state.isLoadingDetail = false;
        state.error = action.payload || "Failed to fetch video";
      });

    builder
      .addCase(likeVideoThunk.pending, (state, action) => {
        state.likingVideoId = action.meta.arg;
        state.error = null;
      })
      .addCase(likeVideoThunk.fulfilled, (state, action) => {
        state.likingVideoId = null;
        if (action.payload.data) {
          applyLikeUpdate(state, action.payload.data);
        }
      })
      .addCase(likeVideoThunk.rejected, (state, action) => {
        state.likingVideoId = null;
        state.error = action.payload || "Failed to like video";
      });

    builder
      .addCase(unlikeVideoThunk.pending, (state, action) => {
        state.likingVideoId = action.meta.arg;
        state.error = null;
      })
      .addCase(unlikeVideoThunk.fulfilled, (state, action) => {
        state.likingVideoId = null;
        if (action.payload.data) {
          applyLikeUpdate(state, action.payload.data);
        }
      })
      .addCase(unlikeVideoThunk.rejected, (state, action) => {
        state.likingVideoId = null;
        state.error = action.payload || "Failed to unlike video";
      });
  },
});

export const { clearError, clearSelectedVideo, setPage, resetFeed } =
  videoSlice.actions;

export default videoSlice.reducer;
