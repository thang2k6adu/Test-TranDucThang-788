"use client";

import React from "react";
import { usePathname } from "next/navigation";
import CollapsibleSidebar from "@/layout/CollapsibleSidebar";
import { Header } from "@/layout/Header";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { getDisplayName, getInitials } from "@/types/user";

const isExploreRoute = (pathname: string) =>
  pathname === ROUTES.EXPLORE || pathname.startsWith(`${ROUTES.EXPLORE}/`);

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const isExplore = isExploreRoute(pathname);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <CollapsibleSidebar />

      <main className="flex min-h-0 flex-1 flex-col">
        <Header
          user={
            user
              ? {
                  name: getDisplayName(user),
                  initials: getInitials(user),
                  avatar: user.avatar ?? undefined,
                }
              : undefined
          }
        />
        <section
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            isExplore ? "overflow-hidden" : "overflow-auto p-6 md:p-8",
          )}
        >
          {children}
        </section>
      </main>
    </div>
  );
};
