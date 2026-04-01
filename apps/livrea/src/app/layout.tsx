import type { Metadata } from "next";
import type * as React from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  description: "Your personal ebook reader and listener",
  title: "Livrea | Ebook listener",
};

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
