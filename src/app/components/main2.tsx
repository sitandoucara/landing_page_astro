"use client";

import Image from "next/image";
import { PiMoonStarsFill } from "react-icons/pi";
import { useState } from "react";
import StarGlow from "./StarGlow";

export default function Main2({
  language,
  setLanguage,
}: {
  language: "en" | "fr";
  setLanguage: (lang: "en" | "fr") => void;
}) {
  const [activeTab, setActiveTab] = useState<"chart" | "home">("chart");

  const mockupSrc =
    activeTab === "chart"
      ? "/assets/mockup_chart.png"
      : "/assets/mockup_home.png";

  const zodiacSrc =
    activeTab === "chart" ? "/assets/zodiac_ligtht.png" : "/assets/daily.png";

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

  return (
    <div className="relative min-h-screen grid grid-rows-[auto_1fr_auto]  overflow-hidden grain-overlay">
      {/* NAV */}
      <nav className="flex border-b z-2 border-[#7b635a] justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-[#7b635a] drop-shadow-[0_0_10px_#795c5299]">
          AstroMood
        </h1>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle dark mode">
            <PiMoonStarsFill className="cursor-pointer text-2xl text-[#7b635a] transition hover:text-[#32221E]" />
          </button>
          <button
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="sm:w-12 sm:h-12 text-[#7b635a] text-sm sm:text-base font-bold flex items-center justify-center hover:text-[#32221E] transition"
          >
            {texts[language].lang}
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div className="grid p-2 z-2 gap-15 grid-cols-1 md:grid-cols-[0.8fr_1fr] items-center justify-center justify-items-center">
        <div className="text-center md:text-left">
          <h1 className="md:text-[2.5rem] text-2xl font-extrabold text-[#7b635a] drop-shadow-[0_0_10px_#795c5299] leading-tight whitespace-pre-line">
            {texts[language].title}
          </h1>

          <div className="flex gap-2 mt-4">
            <StarGlow />
            <p className="text-lg italic text-[#7b635a] drop-shadow-[0_0_6px_rgba(255,191,150,0.4)] transition-all duration-500">
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
      <div className="border-[#7b635a] z-2 border-t mt-2">
        <div className="flex gap-2 text-[#7b635a] justify-center md:justify-between items-center h-full px-6 py-4 text-sm">
          <p>{footerTexts[language].rights}</p>
          <p>{footerTexts[language].built}</p>
          <p>{footerTexts[language].privacy}</p>
          <p>{footerTexts[language].terms}</p>
        </div>
      </div>
    </div>
  );
}
