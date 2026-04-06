import { Provider as JotaiProvider } from "jotai";
import { useNavigate } from "react-router";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
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
    routerOptions: any; // Simplified for now to avoid complex type mapping from useNavigate
  }
}

export function Provider({ children }: ProvidersProps) {
  const navigate = useNavigate();
  const preferredLanguage = useLocale();

  return (
    <JotaiProvider store={myStore}>
      <SpectrumProvider background="layer-2" locale={preferredLanguage.locale} router={{ navigate: (path: string) => navigate(path) }} >
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </SpectrumProvider>
    </JotaiProvider>
  );
}
