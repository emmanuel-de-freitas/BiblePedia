"use client";

import { useEffect } from "react";

interface ErrorProps {
   error: Error & { digest?: string };
   reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
   useEffect(() => {
      console.error("Application error:", error);
   }, [error]);

   return (
      <main
         style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "center",
            padding: "1rem",
         }}>
         <h1
            style={{
               fontSize: "2rem",
               fontWeight: "bold",
               marginBottom: "1rem",
            }}>
            Something went wrong!
         </h1>
         <p
            style={{
               color: "#666",
               marginBottom: "1.5rem",
               textAlign: "center",
            }}>
            {error.message || "An unexpected error occurred."}
         </p>
         {error.digest && (
            <p
               style={{
                  color: "#999",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
               }}>
               Error ID: {error.digest}
            </p>
         )}
         <button
            onClick={reset}
            type="button"
            style={{
               backgroundColor: "#0066cc",
               border: "none",
               borderRadius: "8px",
               color: "white",
               cursor: "pointer",
               fontSize: "1rem",
               padding: "0.75rem 1.5rem",
            }}>
            Try again
         </button>
      </main>
   );
}
