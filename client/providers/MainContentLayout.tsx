"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

interface MainContentLayoutProps {
  children: React.ReactNode;
}

function MainContentLayout({ children }: MainContentLayoutProps) {
  const userContext = useUserContext(); // Get the user context
  const userId = userContext?.user?._id; // Ensure safe access

  return (
    <main className={`${userId ? "pr-[20rem]" : ""} pb-[1.5rem] flex h-full`}>
      {children}
    </main>
  );
}

export default MainContentLayout;
