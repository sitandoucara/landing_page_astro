"use client";

import Image from "next/image";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { useRef, useState } from "react";

import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
//import StarGlow from "./StarGlow";

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
  /*-----scroll animation-----*/

  const containerRef = useRef(null);

  const [displayText1, setDisplayText1] = useState<"none" | "block">("block");
  const [displayText2, setDisplayText2] = useState<"none" | "block">("none");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const marginTop = useTransform(scrollYProgress, [0.3, 0.6], [8, 128]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // déjà présent
    setDisplayText1(latest < 0.3 ? "block" : "none");
    setDisplayText2(latest > 0.29 ? "block" : "none");

    // nouveau : change d’onglet à mi-chemin
    if (latest > 0.6 && activeTab !== "home") {
      setActiveTab("home");
    } else if (latest <= 0.3 && activeTab !== "chart") {
      setActiveTab("chart");
    }
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const opacityZodiacDaily = useTransform(scrollYProgress, [0.3, 1], [0, 1]);
  const opacityMockupHome = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  const opacityZodiacChart = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const opacityMockupChart = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /*----dark/light---------*/

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
    <div ref={containerRef} className="min-h-[300vh] relative">
      <div
        ref={containerRef}
        className={`sticky top-0 min-h-screen grid grid-rows-[auto_1fr_auto] overflow-hidden grain-overlay transition-all duration-500 ${bgColor}`}
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
          <div className="text-center grid  grid-rows-[1fr_1fr] gap-1  items-baseline  md:text-left">
            <div className="text">
              <motion.h1
                className={`md:text-[2.5rem] text-2xl font-extrabold drop-shadow-[0_0_10px_#795c5299] leading-tight whitespace-pre-line transition-all duration-500 ${textColor}`}
                style={{ opacity: opacity1, display: displayText1 }}
              >
                {texts[language].title}
              </motion.h1>

              <motion.p
                className={`text-lg italic drop-shadow-[0_0_6px_rgba(255,191,150,0.4)] mt-4 ${textColor}`}
                style={{ opacity: opacity1, display: displayText1 }}
              >
                {texts[language].subtitle}
              </motion.p>

              <motion.p
                className={`text-lg  mt-4 ${textColor}`}
                style={{ opacity: opacity2, display: displayText2 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </motion.p>
            </div>

            <motion.div className="flex" style={{ marginTop }}>
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
            </motion.div>
          </div>

          {/* IMAGE ZONE */}
          <div className="relative z-3 w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
            <motion.div
              className="absolute inset-0"
              style={{ opacity: opacityZodiacChart }}
            >
              <Image
                src={
                  theme === "dark"
                    ? "/assets/dark/zodiac_dark.png"
                    : "/assets/zodiac_ligtht.png"
                }
                alt="Astro background chart"
                fill
                className="object-contain animate-slow-spin"
              />
            </motion.div>

            {/* Zodiac DAILY */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: opacityZodiacDaily }}
            >
              <Image
                src={
                  theme === "dark"
                    ? "/assets/dark/daily_dark.png"
                    : "/assets/daily.png"
                }
                alt="Astro background home"
                fill
                className="object-contain animate-float-x"
              />
            </motion.div>
            {/* Mockup 
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">*/}
            {/* MOCKUP CHART */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: opacityMockupChart }}
            >
              <Image
                src={
                  theme === "dark"
                    ? "/assets/dark/mockup_chart_dark.png"
                    : "/assets/mockup_chart.png"
                }
                alt="Phone chart"
                width={300}
                height={300}
              />
            </motion.div>

            {/* MOCKUP HOME */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: opacityMockupHome }}
            >
              <Image
                src={
                  theme === "dark"
                    ? "/assets/dark/mockup_home_dark.png"
                    : "/assets/mockup_home.png"
                }
                alt="Phone home"
                width={300}
                height={300}
              />
            </motion.div>

            {/* Fake interaction buttons 
              <div
                className="absolute bottom-[44px] left-[42px] w-[25px] h-[25px] opacity-40 cursor-pointer"
                onClick={() => setActiveTab("home")}
              />
              <div
                className="absolute bottom-[44px] left-[88px] w-[25px] h-[25px] opacity-40 cursor-pointer"
                onClick={() => setActiveTab("chart")}
              />
            </div>*/}
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
    </div>
  );
}
