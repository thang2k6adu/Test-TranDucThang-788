"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserProfileThunk } from "@/store/thunks/authThunks";
import { ROUTES } from "@/constants";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Layout } from "@/layout/AppLayout";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user" | "basic";
}

export function ProtectedLayout({
  children,
  requiredRole,
}: ProtectedLayoutProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, isLoadingProfile, user } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserProfileThunk());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  if (isLoadingProfile && !user) {
    return <LoadingSpinner />;
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== "admin") {
    router.replace(ROUTES.HOME);
    return <LoadingSpinner />;
  }

  return <Layout>{children}</Layout>;
}
