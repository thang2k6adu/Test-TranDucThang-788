"use client";

interface VideoOverlayProps {
  authorName: string;
  description: string;
}

export function VideoOverlay({ authorName, description }: VideoOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-4 pb-5 pt-16">
        <p className="text-base font-semibold text-white drop-shadow-sm">
          @{authorName.replace(/\s+/g, "").toLowerCase()}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-white/90 drop-shadow-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
