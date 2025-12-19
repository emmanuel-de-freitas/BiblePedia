
import { ClientProvider } from './provider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Get the user's preferred language from the Accept-Language header.
  // You could also get this from a database, URL param, etc.
  const lang = 'en-US';

  return (
    <ClientProvider lang={lang}>
      <body style={{ margin: 0, boxSizing: 'border-box', height: 'screen', overscrollBehavior: 'none', overflow: 'hidden' }}>
        {children}
      </body>
    </ClientProvider>
  );
}
