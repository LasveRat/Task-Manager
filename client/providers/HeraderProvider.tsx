import Header from "@/app/Components/Header/Header";
import { useUserContext } from "@/context/userContext";
import React from "react";

function HeraderProvider() {
  const userContext = useUserContext(); // Get the user context
  const userId = userContext?.user?._id; // Ensure safe access

  // If user is not logged in, don't render anything
  if (!userId) {
    return null;
  }

  return <Header />;
}

export default HeraderProvider;
