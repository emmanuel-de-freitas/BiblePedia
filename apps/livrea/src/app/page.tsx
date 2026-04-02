"use client";

//import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Entry() {
  const router = useRouter();

  // useEffect(() => {
  router.replace("/dashboard");
  // }, [router]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
