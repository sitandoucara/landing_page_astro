"use client";

import { FiMoon } from "react-icons/fi";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center p-4">
      {/*<h1 className="text-2xl font-bold font-carattere text-[#EED1B4] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)]">
        AstroMood
      </h1>*/}
      <h1 className="text-2xl font-bold font-carattere text-[#7b635a] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)]">
        AstroMood
      </h1>

      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle dark mode"
          className="text-white text-2xl p-2 rounded-full hover:bg-[#331c60]/30 transition"
        >
          <FiMoon className="cursor-pointer" />
        </button>

        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#7b635a]  text-sm sm:text-base font-bold flex items-center justify-center text-[#EED1B4] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)] hover:bg-[#331c60] transition">
          EN
        </button>
      </div>
    </nav>
  );
}
