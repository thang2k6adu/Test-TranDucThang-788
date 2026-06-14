"use client";

import React from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href={ROUTES.HOME}
        className="mt-8 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
      >
        Back to home
      </Link>
    </div>
  );
}
