'use client'
import Heading from "@/ui/heading";
import { useEffect } from "react";

export default function Entry() {

  useEffect(() => {
    // redirect('/(dashboard)', RedirectType.replace);
  }, []);


  return <div>
    <Heading level={2}>Hello Next.js!</Heading>
  </div>
}
