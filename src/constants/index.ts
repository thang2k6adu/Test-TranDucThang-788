export const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  EXPLORE: "/explore",
} as const;

export const API_ENDPOINTS = {
  VIDEOS: {
    FEED: "/videos/feed",
    DETAIL: (id: string) => `/videos/${id}`,
    LIKE: (id: string) => `/videos/${id}/like`,
  },
} as const;

import { env } from "@/env";

export const SOCKET_URL = env.socketUrl;

export * from "./form-errors";
