import type { Metadata } from "next";
import ForgotPasswordV2 from "@/views/ForgotPasswordV2/ForgotPasswordV2";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordV2 />;
}
