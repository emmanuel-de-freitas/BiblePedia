"use client";

import { Button } from "@heroui/react";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-3xl font-bold">Something went wrong!</h1>
      <p className="mb-6 text-center text-default-500">
        {error.message || "An unexpected error occurred."}
      </p>
      {error.digest && (
        <p className="mb-4 text-sm text-default-400">Error ID: {error.digest}</p>
      )}
      <Button variant="primary" onPress={reset}>
        Try again
      </Button>
    </main>
  );
}
