"use client";

import Image from "next/image";

interface HeaderProps {
  language: "en" | "fr";
  theme: "light" | "dark";
}

export default function Header({ language, theme }: HeaderProps) {
  const texts = {
    en: {
      title: "AstroMood app\nConnected to your stars",
      subtitle: "Discover more about your natal chart",
    },
    fr: {
      title: "AstroMood L'app\nConnectée à tes étoiles",
      subtitle: "Découvrer plus sur votre chart natal",
    },
  };

  const isDark = theme === "dark";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-[0.8fr_1fr] items-center justify-center justify-items-center p-4">
      <div className="grid grid-rows-[1fr_auto] gap-8 items-start">
        <div className="text">
          <h1
            className={`md:text-[2.5rem] text-2xl font-extrabold drop-shadow-[0_0_10px_#795c5299] leading-tight whitespace-pre-line transition-all duration-500 ${textColor}`}
          >
            {texts[language].title}
          </h1>

          <p
            className={`text-lg italic drop-shadow-[0_0_6px_rgba(255,191,150,0.4)] mt-4 ${textColor}`}
          >
            {texts[language].subtitle}
          </p>
        </div>

        <div className="flex">
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
        <div className="absolute inset-0">
          <Image
            src={
              theme === "dark"
                ? "/assets/dark/zodiac_dark.png"
                : "/assets/light/zodiac_ligtht.png"
            }
            alt="Astro background chart"
            fill
            className="object-contain animate-slow-spin"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={
              theme === "dark"
                ? "/assets/dark/mockup_chart_dark.png"
                : "/assets/light/mockup_chart.png"
            }
            alt="Phone chart"
            width={300}
            height={300}
          />
        </div>
      </div>
    </section>
  );
}
