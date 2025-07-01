"use client";

import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";

interface NavbarProps {
  language: "en" | "fr";
  setLanguage: (lang: "en" | "fr") => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({
  language,
  setLanguage,
  theme,
  toggleTheme,
}: NavbarProps) {
  const texts = {
    en: { lang: "FR" },
    fr: { lang: "EN" },
  };

  const isDark = theme === "dark";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";
  const hoverColor = isDark ? "hover:text-[#bfaea2]" : "hover:text-[#32221E]";
  const borderColor = isDark ? "border-[#F2EAE0]" : "border-[#7b635a]";
  const bgColor = isDark ? "bg-[#281109]" : "bg-[#f2eae0]";

  return (
    <nav
      className={`flex z-10 justify-between items-center p-4 border-b transition-all duration-500 ${borderColor}  ${bgColor} sticky top-0 backdrop-blur-sm`}
    >
      <h1
        className={`text-2xl font-bold drop-shadow-[0_0_10px_#795c5299] ${textColor}`}
      >
        AstroMood
      </h1>

      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? (
            <PiMoonStarsFill
              className={`cursor-pointer text-2xl ${textColor} transition ${hoverColor}`}
            />
          ) : (
            <PiSunDimFill
              className={`cursor-pointer text-2xl ${textColor} transition ${hoverColor}`}
            />
          )}
        </button>
        <button
          onClick={() => setLanguage(language === "en" ? "fr" : "en")}
          className={`sm:w-12 sm:h-12 text-sm sm:text-base font-bold flex items-center justify-center transition ${textColor} ${hoverColor}`}
        >
          {texts[language].lang}
        </button>
      </div>
    </nav>
  );
}
