export const dynamic = "force-dynamic";

import { ProtectedLayout } from "@/components/ProtectedLayout";

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
