import type React from "react";
import {useEffect} from "react";

import "@react-spectrum/s2/page.css";
import {Provider} from "@react-spectrum/s2";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  type NavigateOptions,
  Outlet,
  Scripts,
  ScrollRestoration,
  useHref,
  useNavigate,
} from "react-router";
import {client} from "@/services/appwrite";

import type {Route} from "./+types/root";

// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module "@react-spectrum/s2" {
   interface RouterConfig {
      routerOptions: NavigateOptions;
   }
}

export function HydrateFallback() {
   return <p>Loading Game...</p>;
}

export function Layout({ children }: { children: React.ReactNode }) {
   const lang = "en-US";
   const navigate = useNavigate();

   return (
      <Provider elementType="html" locale={lang} router={{ navigate, useHref }} background="layer-1">
         <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
            <title>Livrea | Ebook listener</title>
         </head>
         <body
            style={{
               boxSizing: "border-box",
               height: "100vh",
               margin: 0,
               overflow: "hidden",
               overscrollBehavior: "none",
            }}>
            {children}
            <ScrollRestoration />
            <Scripts />
         </body>
      </Provider>
   );
}

export default function App() {
   useEffect(() => {
      // Verify Appwrite connection on app initialization
      client
         .ping()
         .then(() => {
            console.log("Appwrite connection verified successfully");
         })
         .catch((error) => {
            console.error("Failed to connect to Appwrite:", error);
         });
   }, []);

   return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
   let message = "Oops!";
   let details = "An unexpected error occurred.";
   let stack: string | undefined;

   if (isRouteErrorResponse(error)) {
      message = error.status === 404 ? "404" : "Error";
      details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
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
