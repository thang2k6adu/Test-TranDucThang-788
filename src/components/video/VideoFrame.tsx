"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface VideoFrameProps {
  children: ReactNode;
  className?: string;
}

export function VideoFrame({ children, className }: VideoFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/16] sm:max-w-[520px] lg:max-w-[560px] h-full max-h-full w-auto max-w-[480px] overflow-hidden rounded-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
