// app/root.tsx

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Provider } from "@/components/provider";


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
          {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </Provider>
  );
}

export default function App() {
  return <Outlet />;
}
