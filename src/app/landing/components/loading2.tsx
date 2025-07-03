"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading2({
  language,
  theme,
}: {
  language: "en" | "fr";
  theme: "light" | "dark";
}) {
  const [startExit, setStartExit] = useState(false);
  const [hidden, setHidden] = useState(false);

  const isDark = theme === "dark";

  const bgColor = isDark ? "#281109" : "#f2eae0";
  const borderColor = isDark ? "#F2EAE0" : "#7b635a";
  const textColor = isDark ? "#F2EAE0" : "#7b635a";
  const imageSrc = isDark
    ? "/assets/dark/zodiac_dark.png"
    : "/assets/light/zodiac_ligtht.png";

  const texts = {
    en: "Welcome to AstroMood",
    fr: "Bienvenue sur AstroMood",
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setStartExit(true), 900);
    const timer2 = setTimeout(() => setHidden(true), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen overflow-hidden bg-transparent">
      <div
        className={`absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 transition-all duration-[3000ms] ease-[ease]`}
      >
        {/* Left */}

        <div
          className={`absolute top-0 left-0 h-full w-1/2 border-r-[3px]   grain-overlay  bg-cover bg-center transition-transform duration-[3000ms] ease-[ease] delay-[2000ms] ${
            startExit ? "-translate-x-[110vw]" : ""
          }`}
          style={{ borderColor, backgroundColor: bgColor }}
        />

        {/* Right */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2 border-l-[3px]   grain-overlay  bg-cover bg-center transition-transform duration-[3000ms] ease-[ease] delay-[2000ms] ${
            startExit ? "translate-x-[110vw]" : ""
          }`}
          style={{ borderColor, backgroundColor: bgColor }}
        >
          <div
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full border-[3px]  z-2  p-4"
            style={{ borderColor, backgroundColor: bgColor }}
          >
            <Image
              src={imageSrc}
              alt="Astro loading"
              fill
              className={`object-contain ${
                startExit ? "" : "animate-slow-spin"
              }`}
            />

            {/* TEXT */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                startExit ? "opacity-0" : "opacity-100"
              }`}
            >
              <h1
                className="text-xl sm:text-2xl text-center font-bold  p-2 border-1 rounded-2xl  drop-shadow-[0_0_10px_#795c5299]"
                style={{ backgroundColor: bgColor, color: textColor }}
              >
                {texts[language]}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
