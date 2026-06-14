export const dynamic = "force-dynamic";

import { Layout } from "@/layout/AppLayout";

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
