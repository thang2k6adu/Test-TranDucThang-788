"use client";

import React from "react";
import CollapsibleSidebar from "@/layout/CollapsibleSidebar";
import { Header } from "@/layout/Header";
import { useAppSelector } from "@/store/hooks";
import { getDisplayName, getInitials } from "@/types/user";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAppSelector((state) => state.auth);

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
        <section className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </section>
      </main>
    </div>
  );
};
