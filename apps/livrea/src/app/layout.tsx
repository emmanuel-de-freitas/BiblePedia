import type { Metadata } from "next";
// app/layout.tsx
import type * as React from "react";
import { Providers } from "./providers";
import { usePreferredLanguage } from "@uidotdev/usehooks";

export const metadata: Metadata = {
  description: "Your personal ebook reader and listener",
  title: "Livrea | Ebook listener",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Get the user's preferred language from the Accept-Language header.
  // You could also get this from a database, URL param, etc.
  const lang = usePreferredLanguage();

  return (
    <Providers locale={lang}>
      <body>{children}</body>
    </Providers>
  );
}
