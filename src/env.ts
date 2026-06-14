const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const socketUrl =
  process.env.NEXT_PUBLIC_SOCKET_URL?.replace(/\/+$/, "") ||
  apiBaseUrl.replace(/\/api\/?$/, "");

export const env = {
  apiBaseUrl,
  socketUrl,
  assetBaseUrl: process.env.NEXT_PUBLIC_ASSET_BASE_URL || "",
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  },
  isDev: process.env.NODE_ENV === "development",
} as const;
