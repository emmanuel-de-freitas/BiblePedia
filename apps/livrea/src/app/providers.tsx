"use client";

import "./globals.css";
import { Provider as JotaiProvider } from "jotai";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import myStore from "@/atoms/store";

interface ProvidersProps {
  children: ReactNode;
  locale?: string;
}

export function Providers({ children, locale = "en-US" }: ProvidersProps) {
  const router = useRouter();

  return (
    <JotaiProvider store={myStore}>
      {children}
    </JotaiProvider>
  );
}
