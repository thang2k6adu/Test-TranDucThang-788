import type { Metadata } from "next";
import DashboardPage from "@/views/Dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardRoutePage() {
  return <DashboardPage />;
}
