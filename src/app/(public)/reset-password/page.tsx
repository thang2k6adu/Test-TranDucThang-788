import type { Metadata } from "next";
import ResetPasswordV2 from "@/views/ResetPasswordV2/ResetPasswordV2";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  return <ResetPasswordV2 />;
}
