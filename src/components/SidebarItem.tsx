"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface props {
  id: number;
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SidebarItem = ({ icon, path, title }: props) => {
  const active = "text-white bg-gradient-to-r from-sky-600 to-cyan-400";
  const pathname = usePathname()
  return (
    <>
      <li>
        <Link
          href={path}
          className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-gray-600 hover:text-white
          transition-all duration-300 
          ${pathname === path ? active : ""}
          `}
        >
          {icon}
          <span className="-mr-1 font-medium">{title}</span>
        </Link>
      </li>
    </>
  );
};
