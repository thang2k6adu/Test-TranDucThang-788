export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
  PROFILE: "/profile",
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  BASIC: "basic",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    RESET_PASSWORD: "/auth/reset-password",
    FIREBASE_LOGIN: "/auth/firebase/login",
    SEND_VERIFICATION_EMAIL: "/auth/send-verification-email",
  },
  USERS: {
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
  },
  VIDEOS: {
    FEED: "/videos/feed",
    DETAIL: (id: string) => `/videos/${id}`,
    LIKE: (id: string) => `/videos/${id}/like`,
  },
} as const;

export const TOKEN_STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  TOKEN_EXPIRES_AT: "tokenExpiresAt",
} as const;

export const AUTH_STORAGE_KEYS = {
  PENDING_VERIFICATION_EMAIL: "pendingVerificationEmail",
} as const;

import { env } from "@/env";

export const SOCKET_URL = env.socketUrl;

export * from "./form-errors";
