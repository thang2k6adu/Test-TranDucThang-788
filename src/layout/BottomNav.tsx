"use client";

import { LuCompass, LuHouse as Home, LuUser as User } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants";

interface BottomNavProps {
  className?: string;
}

const navItems = [
  { icon: Home, label: "Trang chủ", path: ROUTES.HOME },
  { icon: LuCompass, label: "Khám phá", path: ROUTES.EXPLORE },
  { icon: User, label: "Hồ sơ", path: ROUTES.PROFILE },
];

export function BottomNav({ className }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return pathname === ROUTES.HOME;
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/95 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-medium transition-colors",
                active ? "text-white" : "text-white/55 hover:text-white/80",
              )}
            >
              <Icon className={cn("size-5", active && "text-[#fe2c55]")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
