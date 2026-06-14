import type { Metadata } from "next";
import RegisterV2 from "@/views/RegisterV2/RegisterV2";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your account",
};

export default function SignupPage() {
  return <RegisterV2 />;
}
