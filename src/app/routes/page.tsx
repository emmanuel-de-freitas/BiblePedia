'use client'
import Heading from "@/ui/heading";
import { useEffect } from "react";

export default function Page() {

  useEffect(() => {
    // redirect('/(dashboard)', RedirectType.replace);
  }, []);


  return <div>
    <Heading level={1}>Hello Next.js!</Heading>
    <Heading level={2}>Welcome to Livres</Heading>
    <Heading level={3}>Get Started</Heading>
    <Heading level={4}>Installation</Heading>
  </div>
}
