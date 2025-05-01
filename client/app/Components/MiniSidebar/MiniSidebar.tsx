"use client";
import IconCheck from "@/public/icons/IconCheck";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";

function MiniSidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "Today",
      link: "/",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
  ];

  return (
    <div
      className={`bg-[#f9f9f9] flex flex-col transition-all ${
        isExpanded ? "w-60" : "w-20"
      } h-screen p-3 relative`}
    >
      {/* Logo & Toggle Button */}
      <div className="flex items-center justify-between">
        <Image
          src={`${isExpanded ? "/Logo-White.png" : "/Small-Logo-White.png"}`}
          alt="logo"
          width={160}
          height={170}
          className="transition-all"
        />
        <button
          onClick={toggleSidebar}
          className="p-2 mt-4 rounded-sm hover:bg-gray-200 transition-all"
        >
          <IoChevronBack
            className={`text-xl ${isExpanded ? "rotate-0" : "rotate-180"}`}
          />
        </button>
      </div>

      {/* Navigation Section */}
      <ul className="mt-[150px] flex flex-col gap-4">
        {navItems.map((item, index) => (
          <li key={index} className="relative group">
            <Link
              href={item.link}
              className={`flex items-center gap-4 px-3 py-2 rounded-md hover:bg-gray-300 transition-all ${
                pathname === item.link ? "bg-gray-300" : ""
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
              <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-300 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title}
              </span>
            )}
          </li>
        ))}
        <hr className="my-4 border-t border-gray-300" />
        <span
          className={`${
            isExpanded ? "block px-3 text-sm text-gray-500 uppercase" : "hidden"
          }`}
        >
          Custom files
        </span>
        <li className="relative group mt-2">
          <button
            onClick={() => {
              // Navigate to create folder page
              window.location.href = "/Create-Folder"; // you can also use router.push if using next/router
            }}
            className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-gray-300 transition-all w-full"
          >
            <IconFileCheck strokeColor="#71717a" />{" "}
            {/* Use any icon you prefer */}
            <span
              className={`${isExpanded ? "block" : "hidden"} transition-all`}
            >
              Add New Folder
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default MiniSidebar;
