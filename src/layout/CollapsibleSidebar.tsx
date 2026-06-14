"use client";

import * as React from "react";
import {
  LuCompass,
  LuHouse as Home,
  LuLogOut as LogOut,
  LuMoon,
  LuSun,
  LuUser as User,
  LuUser as UserIcon,
} from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutThunk } from "@/store/thunks/authThunks";
import { ROUTES } from "@/constants";
import { useTheme } from "@/hooks/useTheme";
import { getDisplayName, getInitials } from "@/types/user";

export default function CollapsibleSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { toggle, isDark } = useTheme();

  const displayName = user ? getDisplayName(user) : "Guest";
  const initials = user ? getInitials(user) : "G";

  const navItems = [
    { icon: Home, label: "Home", path: ROUTES.HOME },
    { icon: LuCompass, label: "Khám phá", path: ROUTES.EXPLORE },
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
        "relative flex h-screen flex-col border-r border-border bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
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

      <div
        className={cn(
          "mt-auto flex flex-col gap-2 border-t border-border p-4",
          isCollapsed && "items-center",
        )}
      >
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          onClick={toggle}
          className={cn(!isCollapsed && "w-full justify-start")}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <LuSun className="size-5" />
          ) : (
            <LuMoon className="size-5" />
          )}
          {!isCollapsed && (
            <span className="ml-3 text-sm font-medium">
              {isDark ? "Light mode" : "Dark mode"}
            </span>
          )}
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "h-auto rounded-full p-2",
                !isCollapsed && "w-full justify-start px-3",
              )}
            >
              <div
                className={cn(
                  "flex items-center",
                  isCollapsed ? "justify-center" : "gap-3",
                )}
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user?.avatar ?? undefined}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <span className="text-sm font-medium">{displayName}</span>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="start" side="right">
            <div className="flex flex-col gap-1">
              <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                Account
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl text-sm font-normal"
                onClick={() => router.push(ROUTES.PROFILE)}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl text-sm font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={async () => {
                  await dispatch(logoutThunk());
                  router.push(ROUTES.LOGIN);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
