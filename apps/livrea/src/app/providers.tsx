"use client";

import "./globals.css";
import { Provider as SpectrumProvider } from "@react-spectrum/s2";
import { Provider as JotaiProvider } from "jotai";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import myStore from "@/atoms/store";

// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module "@react-spectrum/s2" {
   interface RouterConfig {
      routerOptions: {
         scroll?: boolean;
      };
   }
}

interface ProvidersProps {
   children: ReactNode;
   locale?: string;
}

export function Providers({ children, locale = "en-US" }: ProvidersProps) {
   const router = useRouter();

   return (
      <JotaiProvider store={myStore}>
         <SpectrumProvider
            locale={locale}
            elementType="html"
            router={{
               navigate: (path, options) => {
                  router.push(path, { scroll: options?.scroll });
               },
               useHref: (href: string) => href,
            }}
            background="layer-1">
            {children}
         </SpectrumProvider>
      </JotaiProvider>
   );
}
