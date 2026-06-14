import { initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { env } from "@/env";

const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
};

const isFirebaseConfigured =
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "AIzaSyDummyKey123456789012345678901234567890" &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "dummy-project-id";

let auth: ReturnType<typeof getAuth> | null = null;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    setPersistence(auth, inMemoryPersistence).catch(() => {
      // Non-critical — auth still works for sign-in
    });
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
  }
} else {
  console.warn(
    "Firebase is not configured. Please update .env with your Firebase credentials.",
  );
}

export { auth };
