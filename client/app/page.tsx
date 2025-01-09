"use client";
import useRedirect from "@/hooks/useUserRedirect";

export default function Home() {
  useRedirect("/Login");

  return <main></main>;
}
