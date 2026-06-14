import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Focus",
};

export default function FocusPage() {
  return (
    <PlaceholderPage
      title="Focus Rooms"
      description="LiveKit and matchmaking can be added in a later phase."
    />
  );
}
