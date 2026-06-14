"use client";

import React from "react";
import { usePathname } from "next/navigation";
import BottomNav from "@/layout/BottomNav";
import CollapsibleSidebar from "@/layout/CollapsibleSidebar";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

const isExploreRoute = (pathname: string) =>
  pathname === ROUTES.EXPLORE || pathname.startsWith(`${ROUTES.EXPLORE}/`);

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const isExplore = isExploreRoute(pathname);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="hidden h-full md:flex">
        <CollapsibleSidebar />
      </div>

      <main className="flex min-h-0 flex-1 flex-col">
        <section
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            isExplore ? "overflow-hidden" : "overflow-auto p-6 md:p-8",
          )}
        >
          {children}
        </section>
        <BottomNav />
      </main>
    </div>
  );
};
