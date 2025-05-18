"use client";

import { FiMoon } from "react-icons/fi";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 ">
      <h1 className="text-2xl font-bold">Logo</h1>
      <FiMoon className="text-white text-2xl cursor-pointer" />
    </nav>
  );
}
