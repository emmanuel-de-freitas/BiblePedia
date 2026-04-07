import { Provider as JotaiProvider } from "jotai";
import type { ReactNode } from "react";
import { Provider as SpectrumProvider } from '@react-spectrum/s2';
import {useNavigate, useHref, useRouteLoaderData, type NavigateOptions, type LoaderFunctionArgs} from 'react-router';

import myStore from "@/atoms/store";
import { useLocale } from "@heroui/react";

interface ProvidersProps {
  children: ReactNode;
  locale?: string;
}

// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module '@react-spectrum/s2' {
  interface RouterConfig {
    routerOptions: NavigateOptions; // Simplified for now to avoid complex type mapping from useNavigate
  }
}

export function Provider({ children }: ProvidersProps) {
  const navigate = useNavigate();
  const preferredLanguage = useLocale();

  return (
    <JotaiProvider store={myStore}>
      <SpectrumProvider  elementType="html" background="layer-2" locale={preferredLanguage.locale} router={{ navigate, useHref }} >
          {children}
      </SpectrumProvider>
    </JotaiProvider>
  );
}
