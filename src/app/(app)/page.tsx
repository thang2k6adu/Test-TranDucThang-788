import type { Metadata } from "next";
import HomePage from "@/views/Dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomeRoutePage() {
  return <HomePage />;
}
