import type { Metadata } from "next";
import VerifyEmailV2 from "@/views/VerifyEmailV2/VerifyEmailV2";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyEmailV2 />
    </Suspense>
  );
}
