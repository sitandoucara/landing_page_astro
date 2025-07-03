"use client";

import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import Image from "next/image";

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
  const circleBg = isDark ? "bg-[#1a0d06]" : "bg-[#e6ddd4]";
  const circleBorder = isDark ? "border-[#F2EAE0]/20" : "border-[#7b635a]/20";

  // Chemin du logo selon le thème
  const imageSrc = isDark ? "/assets/dark/logo.png" : "/assets/light/logo.png";

  return (
    <nav
      className={`flex z-10 justify-between items-center p-4 border-b transition-all duration-500 ${borderColor} ${bgColor} sticky top-0 backdrop-blur-sm`}
    >
      {/* Logo + Titre à gauche */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 relative">
          <Image
            src={imageSrc}
            alt="My AstroMood Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1
          className={`text-2xl font-bold drop-shadow-[0_0_10px_#795c5299] ${textColor}`}
        >
          My AstroMood
        </h1>
      </div>

      {/* Contrôles à droite - chacun dans son cercle */}
      <div className="flex items-center gap-3">
        {/* Switch thème dans son cercle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 ${circleBg} ${circleBorder} ${hoverColor}`}
        >
          {theme === "light" ? (
            <PiMoonStarsFill
              className={`text-lg ${textColor} transition-colors`}
            />
          ) : (
            <PiSunDimFill
              className={`text-lg ${textColor} transition-colors`}
            />
          )}
        </button>

        {/* Switch langue dans son cercle */}
        <button
          onClick={() => setLanguage(language === "en" ? "fr" : "en")}
          className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110 ${circleBg} ${circleBorder} ${textColor} ${hoverColor}`}
        >
          {texts[language].lang}
        </button>
      </div>
    </nav>
  );
}
