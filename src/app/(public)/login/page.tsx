import type { Metadata } from "next";
import LoginV2 from "@/views/LoginV2/LoginV2";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Focus Hub",
};

export default function LoginPage() {
  return <LoginV2 />;
}
