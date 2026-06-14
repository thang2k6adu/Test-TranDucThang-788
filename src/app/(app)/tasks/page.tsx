import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Tasks",
};

export default function TasksPage() {
  return (
    <PlaceholderPage
      title="Tasks"
      description="Add task features here following CODING_GUIDE workflow."
    />
  );
}
