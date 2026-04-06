"use client";

import { Provider as JotaiProvider } from "jotai";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Provider as SpectrumProvider } from '@react-spectrum/s2';

import myStore from "@/atoms/store";
import { useLocale } from "@heroui/react";

interface ProvidersProps {
  children: ReactNode;
  locale?: string;
}


// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module '@react-spectrum/s2' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

export function Provider({ children }: ProvidersProps) {
  const router = useRouter();
  const preferredLanguage = useLocale();

  return (
    <JotaiProvider store={myStore}>
      <SpectrumProvider background="layer-2" locale={preferredLanguage.locale} elementType="html" router={{ navigate: router.push }}>
        {children}
      </SpectrumProvider>
    </JotaiProvider>
  );
}
