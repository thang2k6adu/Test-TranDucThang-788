import type { Metadata } from "next";
import LoginV2 from "@/views/LoginV2/LoginV2";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return <LoginV2 />;
}
