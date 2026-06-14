"use client";

import {
  LuBookmark,
  LuHeart,
  LuMessageCircle,
  LuShare2,
} from "react-icons/lu";
import { cn, formatCount } from "@/lib/utils";

interface VideoActionRailProps {
  likesCount: number;
  isLiked?: boolean;
  isLiking?: boolean;
  onToggleLike?: () => void;
}

export function VideoActionRail({
  likesCount,
  isLiked = false,
  isLiking = false,
  onToggleLike,
}: VideoActionRailProps) {
  return (
    <div className="flex flex-col items-center gap-5 pb-6 text-white">
      <ActionButton
        icon={
          <LuHeart
            className={cn(
              "size-7 transition-colors",
              isLiked ? "fill-[#fe2c55] text-[#fe2c55]" : "text-white",
            )}
          />
        }
        label={formatCount(likesCount)}
        active={isLiked}
        disabled={isLiking}
        onClick={(event) => {
          event.stopPropagation();
          onToggleLike?.();
        }}
        ariaLabel={isLiked ? "Unlike video" : "Like video"}
      />

      <ActionButton
        icon={<LuMessageCircle className="size-7 text-white" />}
        label="0"
        ariaLabel="Comments"
        onClick={(event) => event.stopPropagation()}
      />

      <ActionButton
        icon={<LuBookmark className="size-7 text-white" />}
        label="0"
        ariaLabel="Save video"
        onClick={(event) => event.stopPropagation()}
      />

      <ActionButton
        icon={<LuShare2 className="size-7 text-white" />}
        label="Share"
        ariaLabel="Share video"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  ariaLabel: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ActionButton({
  icon,
  label,
  active,
  disabled,
  ariaLabel,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 text-xs font-semibold text-white transition-opacity",
        disabled && "opacity-60",
        active && "text-[#fe2c55]",
      )}
    >
      <span className="transition-transform hover:scale-105 active:scale-95">
        {icon}
      </span>
      <span className="drop-shadow-sm">{label}</span>
    </button>
  );
}
