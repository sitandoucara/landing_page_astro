"use client";

import Image from "next/image";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { useState } from "react";
import StarGlow from "./StarGlow";

export default function Main2({
  language,
  setLanguage,
  theme,
  toggleTheme,
}: {
  language: "en" | "fr";
  setLanguage: (lang: "en" | "fr") => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"chart" | "home">("chart");

  const mockupSrc =
    theme === "dark"
      ? activeTab === "chart"
        ? "/assets/dark/mockup_home_dark.png"
        : "/assets/dark/mockup_chart_dark.png"
      : activeTab === "chart"
      ? "/assets/mockup_chart.png"
      : "/assets/mockup_home.png";

  const zodiacSrc =
    theme === "dark"
      ? activeTab === "chart"
        ? "/assets/dark/zodiac_dark.png"
        : "/assets/dark/daily_dark.png"
      : activeTab === "chart"
      ? "/assets/zodiac_ligtht.png"
      : "/assets/daily.png";

  const texts = {
    en: {
      title: "AstroMood app\nConnected to your stars",
      subtitle:
        activeTab === "chart"
          ? "Discover more about your natal chart"
          : "Daily affirmations & horoscope",
      lang: "FR",
    },
    fr: {
      title: "AstroMood L'app\nConnectée à tes étoiles",
      subtitle:
        activeTab === "chart"
          ? "Découvrer plus sur votre chart natal"
          : "Affirmation & Horoscope régulier",
      lang: "EN",
    },
  };

  const footerTexts = {
    en: {
      rights: "© 2025 AstroMood. All rights reserved.",
      built: "Built by Si_Graph",
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
    },
    fr: {
      rights: "© 2025 AstroMood. Tous droits réservés.",
      built: "Conçu par Si_Graph",
      privacy: "Politique de confidentialité",
      terms: "Conditions générales",
    },
  };

  const isDark = theme === "dark";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";
  const hoverColor = isDark ? "hover:text-[#bfaea2]" : "hover:text-[#32221E]";
  const bgColor = isDark ? "bg-[#281109]" : "bg-[#f2eae0]";
  const borderColor = isDark ? "border-[#F2EAE0]" : "border-[#7b635a]";

  return (
    <div
      className={`relative min-h-screen grid grid-rows-[auto_1fr_auto] overflow-hidden grain-overlay transition-all duration-500 ${bgColor}`}
    >
      {/* NAV */}
      <nav
        className={`flex z-2 justify-between items-center p-4 border-b transition-all duration-500 ${borderColor}`}
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

      {/* HEADER */}
      <div className="grid p-2 z-2 gap-15 grid-cols-1 md:grid-cols-[0.8fr_1fr] items-center justify-center justify-items-center">
        <div className="text-center md:text-left">
          <h1
            className={`md:text-[2.5rem] text-2xl font-extrabold drop-shadow-[0_0_10px_#795c5299] leading-tight whitespace-pre-line transition-all duration-500 ${textColor}`}
          >
            {texts[language].title}
          </h1>

          <div className="flex gap-2 mt-4">
            <StarGlow />
            <p
              className={`text-lg italic drop-shadow-[0_0_6px_rgba(255,191,150,0.4)] transition-all duration-500 ${textColor}`}
            >
              {texts[language].subtitle}
            </p>
            <StarGlow />
          </div>

          <div className="flex mt-5">
            <Image
              src="/assets/App_Store.png"
              alt="App Store"
              width={150}
              height={150}
            />
            <Image
              src="/assets/Google_Play.png"
              alt="Google Play"
              width={150}
              height={150}
              className="ml-2"
            />
          </div>
        </div>

        {/* IMAGE ZONE */}
        <div className="relative z-3 w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
          <Image
            src={zodiacSrc}
            alt="Astro background"
            fill
            className={`object-contain transition-all duration-700 ease-in-out ${
              activeTab === "chart" ? "animate-slow-spin" : "animate-float-x"
            }`}
          />

          {/* Mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={mockupSrc}
              alt="Phone"
              width={300}
              height={300}
              className="transition-all duration-700 ease-in-out"
            />

            {/* Fake interaction buttons */}
            <div
              className="absolute bottom-[44px] left-[42px] w-[25px] h-[25px] opacity-40 cursor-pointer"
              onClick={() => setActiveTab("home")}
            />
            <div
              className="absolute bottom-[44px] left-[88px] w-[25px] h-[25px] opacity-40 cursor-pointer"
              onClick={() => setActiveTab("chart")}
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className={`z-2 border-t mt-2 transition-all duration-500 ${borderColor}`}
      >
        <div
          className={`flex gap-2 justify-center md:justify-between items-center h-full px-6 py-4 text-sm transition-all duration-500 ${textColor}`}
        >
          <p>{footerTexts[language].rights}</p>
          <p>{footerTexts[language].built}</p>
          <p>{footerTexts[language].privacy}</p>
          <p>{footerTexts[language].terms}</p>
        </div>
      </div>
    </div>
  );
}
