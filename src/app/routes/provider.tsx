"use client";
import '@react-spectrum/s2/page.css';
import { useRouter } from 'next/navigation';
import { Provider } from '@react-spectrum/s2';
import { Provider as StateProvider } from 'jotai'
// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module '@react-spectrum/s2' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

export function ClientProvider({ lang, children }: { children: React.ReactNode, lang: string }) {
  let router = useRouter();

  return (
    <StateProvider>
      <Provider elementType="html" locale={lang} background='base' router={{ navigate: router.push }}>
        {children}
      </Provider>
    </StateProvider>
  );
}
