"use client";

import { LuHeart, LuMessageCircle, LuShare2 } from "react-icons/lu";
import { cn, formatCount } from "@/lib/utils";

interface VideoOverlayProps {
  authorName: string;
  description: string;
  likesCount: number;
  isLiked?: boolean;
  isLiking?: boolean;
  onToggleLike?: () => void;
}

export function VideoOverlay({
  authorName,
  description,
  likesCount,
  isLiked = false,
  isLiking = false,
  onToggleLike,
}: VideoOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-4 pb-5 pt-16 pr-20">
        <p className="text-base font-semibold text-white drop-shadow-sm">
          @{authorName.replace(/\s+/g, "").toLowerCase()}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-white/90 drop-shadow-sm">
          {description}
        </p>
      </div>

      <div className="pointer-events-auto absolute bottom-24 right-3 flex flex-col items-center gap-5 md:bottom-28 md:gap-6">
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
          icon={<LuShare2 className="size-7 text-white" />}
          label="Share"
          ariaLabel="Share video"
          onClick={(event) => event.stopPropagation()}
        />
      </div>
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
        "flex flex-col items-center gap-1 text-xs font-medium text-white transition-opacity",
        disabled && "opacity-60",
        active && "text-[#fe2c55]",
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95">
        {icon}
      </span>
      <span className="drop-shadow-sm">{label}</span>
    </button>
  );
}
