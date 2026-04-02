"use client";


import type * as React from "react";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
