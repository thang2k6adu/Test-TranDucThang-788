"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { store, persistor } from "@/store";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/config/i18n";

function AppEffects({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppEffects>{children}</AppEffects>
          <Toaster position="top-right" />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
