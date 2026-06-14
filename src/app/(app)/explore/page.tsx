import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Khám phá",
};

export default function ExplorePage() {
  return (
    <PlaceholderPage
      title="Khám phá"
      description="Trang khám phá sẽ được bổ sung sau."
    />
  );
}
