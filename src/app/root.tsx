import '@react-spectrum/s2/page.css';
import { Provider } from '@react-spectrum/s2';
import { useNavigate, useHref, useRouteLoaderData, type NavigateOptions, type LoaderFunctionArgs } from 'react-router';

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module '@react-spectrum/s2' {
  interface RouterConfig {
    routerOptions: NavigateOptions
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  let lang = 'en-US';
  let navigate = useNavigate();


  return (
    <Provider elementType="html" locale={lang} router={{ navigate, useHref }}>
      <html lang="en" data-background="base">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body style={{ margin: 0, boxSizing: 'border-box', height: 'screen', overscrollBehavior: 'none', overflow: 'hidden' }}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </Provider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
