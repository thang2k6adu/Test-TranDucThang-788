"use client";

import {
  LuChevronDown as ChevronDown,
  LuLogOut as LogOut,
  LuMoon,
  LuSun,
  LuUser as UserIcon,
} from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logoutThunk } from "@/store/thunks/authThunks";
import { ROUTES } from "@/constants";
import { useTheme } from "@/hooks/useTheme";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type HeaderProps = {
  user?: {
    name: string;
    initials?: string;
    avatar?: string;
  };
};

export function Header({ user }: HeaderProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toggle, isDark } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b bg-background">
      <div className="flex items-center justify-end gap-2 px-6 py-4 md:gap-4 md:px-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <LuSun className="size-5" />
          ) : (
            <LuMoon className="size-5" />
          )}
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-auto rounded-full p-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback>
                    {user?.initials ?? user?.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden flex-col items-start leading-tight sm:flex">
                  <span className="text-sm font-medium">
                    {user?.name ?? "Guest"}
                  </span>
                </div>

                <ChevronDown className="size-4 text-muted-foreground" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mr-6 w-56 p-2" align="start">
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
    </header>
  );
}
