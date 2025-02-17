"use client";

import IconCheck from "@/public/icons/IconCheck";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import IconDeleteAll from "@/public/icons/IconDeleteAll";

function MiniSidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const getStrokeColor = (link) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All Tasks",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];

  return (
    <div
      className={`bg-[#181a20] text-white flex flex-col transition-all ${
        isExpanded ? "w-60" : "w-16"
      } h-screen p-3 relative`}
    >
      {/* Logo & Toggle Button */}
      <div className="flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="logo"
          width={32}
          height={32}
          className="transition-all"
        />
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 transition-all"
        >
          <IoChevronBack
            className={`text-xl ${isExpanded ? "rotate-0" : "rotate-180"}`}
          />
        </button>
      </div>

      {/* Navigation Section */}
      <ul className="mt-6 flex flex-col gap-4">
        {navItems.map((item, index) => (
          <li key={index} className="relative group">
            <Link
              href={item.link}
              className={`flex items-center gap-4 px-3 py-2 rounded-md hover:bg-gray-700 transition-all ${
                pathname === item.link ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              <span
                className={`${isExpanded ? "block" : "hidden"} transition-all`}
              >
                {item.title}
              </span>
            </Link>
            {!isExpanded && (
              <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Delete Button */}
      <div className="mt-auto flex justify-center">
        <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31] p-2 rounded-full">
          <IconDeleteAll strokeColor="#EB4E31" />
        </button>
      </div>
    </div>
  );
}

export default MiniSidebar;
