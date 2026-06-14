import type { Metadata } from "next";
import DashboardPage from "@/views/Dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard",
};

export default function HomePage() {
  return <DashboardPage />;
}
