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
        "relative aspect-[9/16] h-full max-h-full w-auto max-w-[480px] overflow-hidden rounded-xl shadow-2xl shadow-black/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
