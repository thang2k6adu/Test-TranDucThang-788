"use client";

import * as React from "react";
import { LuHouse as Home, LuUser as User } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from "@/constants";

export default function CollapsibleSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", path: ROUTES.HOME },
    { icon: User, label: "Profile", path: ROUTES.PROFILE },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className={cn(
        "relative flex h-screen flex-col border-r bg-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="text-lg font-semibold">{isCollapsed ? "A" : "App"}</div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => router.push(item.path)}
                className={cn(
                  "h-11 justify-start px-4",
                  isCollapsed && "justify-center px-0",
                  active &&
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
