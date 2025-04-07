import MiniSidebar from "@/app/Components/MiniSidebar/MiniSidebar";
import { useUserContext } from "@/context/userContext";
import React from "react";

function MiniSidebarProvider() {
  const userContext = useUserContext(); // Get the user context
  const userId = userContext?.user?._id; // Ensure safe access

  // If user is not logged in, don't render anything
  if (!userId) {
    return null;
  }

  return <MiniSidebar />;
}

export default MiniSidebarProvider;
