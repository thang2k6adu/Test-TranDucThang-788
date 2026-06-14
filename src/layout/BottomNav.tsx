"use client";

import { usePathname, useRouter } from "next/navigation";
import { LuCompass, LuHouse as Home, LuUser as User } from "react-icons/lu";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: ROUTES.HOME },
  { icon: LuCompass, label: "Khám phá", path: ROUTES.EXPLORE },
  { icon: User, label: "Profile", path: ROUTES.PROFILE },
] as const;

const isActivePath = (pathname: string, path: string) => {
  if (path === ROUTES.HOME) {
    return pathname === ROUTES.HOME;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
};

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="shrink-0 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid h-14 grid-cols-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActivePath(pathname, item.path);

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className={cn("size-5", active && "stroke-[2.5]")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
