"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, profile, moon } from "@/utils/icons";

import Link from "next/link";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { activeTasks } = useTasks();

  const { name } = user;
  const userId = user._id;
  return (
    <header className="px-6 my-4 w-full flex justify-between items-center bg-[#f9f9f9]">
      <div></div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <div className="flex gap-4 items-center">
          <Link
            href="https://github.com"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {github}
          </Link>
          <Link
            href="https://github.com"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {moon}
          </Link>
          <Link
            href="https://github.com"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {profile}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
