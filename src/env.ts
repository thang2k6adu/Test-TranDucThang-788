const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const socketUrl =
  process.env.NEXT_PUBLIC_SOCKET_URL?.replace(/\/+$/, "") ||
  apiBaseUrl.replace(/\/api\/?$/, "");

export const env = {
  apiBaseUrl,
  socketUrl,
  assetBaseUrl: process.env.NEXT_PUBLIC_ASSET_BASE_URL || "",
  isDev: process.env.NODE_ENV === "development",
} as const;
