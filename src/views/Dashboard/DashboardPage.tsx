"use client";

import { useAppSelector } from "@/store/hooks";
import { getDisplayName } from "@/types/user";

export default function HomePage() {
  const { user } = useAppSelector((state) => state.auth);
  const name = user ? getDisplayName(user) : "there";

  return (
    <div className="rounded-lg border bg-card p-8">
      <h1 className="text-2xl font-semibold">Welcome, {name}</h1>
      <p className="mt-2 text-muted-foreground">
        Next.js App Router boilerplate — add features in{" "}
        <code className="text-sm">src/views/</code> and wire routes in{" "}
        <code className="text-sm">src/app/</code>.
      </p>
    </div>
  );
}
