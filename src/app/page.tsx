"use client";

import { useState } from "react";
import Link from "next/link";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { FiSettings, FiGlobe } from "react-icons/fi";

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#281109]" : "bg-[#f2eae0]";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";
  const cardBg = isDark ? "bg-[#3D2918]" : "bg-white";
  const borderColor = isDark ? "border-[#F2EAE0]/20" : "border-[#7b635a]/20";

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${bgColor} flex items-center justify-center p-8`}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-6 right-6 p-3 rounded-full ${cardBg} border ${borderColor} hover:opacity-80 transition`}
      >
        {theme === "light" ? (
          <PiMoonStarsFill className={`text-2xl ${textColor}`} />
        ) : (
          <PiSunDimFill className={`text-2xl ${textColor}`} />
        )}
      </button>

      <div className="max-w-2xl w-full text-center">
        {/* Logo/Title */}
        <h1
          className={`text-6xl font-extrabold mb-4 drop-shadow-[0_0_10px_#795c5299] ${textColor}`}
        >
          My AstroMood
        </h1>
        <p className={`text-xl mb-12 opacity-80 ${textColor}`}>
          Choose your destination
        </p>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Landing Page Card */}
          <Link href="/landing" className="group">
            <div
              className={`p-8 rounded-2xl ${cardBg} border ${borderColor} hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full ${
                  isDark ? "bg-[#BFB0A7]" : "bg-[#7b635a]"
                } flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <FiGlobe
                  className={`text-2xl ${
                    isDark ? "text-[#281109]" : "text-white"
                  }`}
                />
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${textColor}`}>
                Landing Page
              </h2>
              <p className={`${textColor} opacity-70`}>
                Discover AstroMood s features and download the app
              </p>
            </div>
          </Link>

          {/* Admin Panel Card */}
          <Link href="/admin/dashboard" className="group">
            <div
              className={`p-8 rounded-2xl ${cardBg} border ${borderColor} hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full ${
                  isDark ? "bg-[#BFB0A7]" : "bg-[#7b635a]"
                } flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <FiSettings
                  className={`text-2xl ${
                    isDark ? "text-[#281109]" : "text-white"
                  }`}
                />
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${textColor}`}>
                Admin Panel
              </h2>
              <p className={`${textColor} opacity-70`}>
                Manage app content and user experience
              </p>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p className={`mt-12 text-sm opacity-60 ${textColor}`}>
          © 2025 My AstroMood
        </p>
      </div>
    </div>
  );
}
