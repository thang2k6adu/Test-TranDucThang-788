"use client";

export default function HomePage() {
  return (
    <div className="rounded-lg border bg-card p-8">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="mt-2 text-muted-foreground">
        Mở{" "}
        <a href="/explore" className="font-medium text-foreground underline">
          Khám phá
        </a>{" "}
        để xem feed video dọc kiểu TikTok.
      </p>
    </div>
  );
}
