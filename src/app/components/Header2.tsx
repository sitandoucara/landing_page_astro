// components/Header2.tsx
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

interface Header2Props {
  language: "en" | "fr";
  theme: "light" | "dark";
}

export default function Header2({ language, theme }: Header2Props) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const marginTop = useTransform(scrollYProgress, [0.3, 0.6], [8, 128]);

  // Custom hook pour gérer l'affichage
  function useDisplay(opacity: MotionValue<unknown>) {
    const [display, setDisplay] = useState<"block" | "none">("none");

    useMotionValueEvent(opacity, "change", (v) => {
      if (typeof v === "number" && v <= 0.01) {
        setDisplay("none");
      } else {
        setDisplay("block");
      }
    });

    return display;
  }

  const [activeTab, setActiveTab] = useState<
    "chart" | "home" | "compatibility"
  >("chart");

  // Gestion du changement d'onglet basé sur le scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.6 && activeTab !== "compatibility") {
      setActiveTab("compatibility");
    } else if (latest >= 0.3 && latest <= 0.6 && activeTab !== "home") {
      setActiveTab("home");
    } else if (latest < 0.3 && activeTab !== "chart") {
      setActiveTab("chart");
    }
  });

  // OPACITÉS
  const opacityChart = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const opacityHome = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.6, 0.7],
    [0, 1, 1, 0]
  );
  const opacityComp = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  // DISPLAYS calculés dynamiquement
  const displayChart = useDisplay(opacityChart as MotionValue<unknown>);
  const displayHome = useDisplay(opacityHome as MotionValue<unknown>);
  const displayComp = useDisplay(opacityComp as MotionValue<unknown>);

  // IMAGES BACKGROUND
  const opacityZodiacChart = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const displayZodiacChart = useDisplay(
    opacityZodiacChart as MotionValue<unknown>
  );

  const opacityZodiacDaily = opacityHome;
  const displayZodiacDaily = useDisplay(
    opacityZodiacDaily as MotionValue<unknown>
  );

  const opacityZodiacCompatibility = opacityComp;
  const displayZodiacCompatibility = useDisplay(
    opacityZodiacCompatibility as MotionValue<unknown>
  );

  // MOCKUPS
  const opacityMockupChart = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const displayMockupChart = useDisplay(
    opacityMockupChart as MotionValue<unknown>
  );

  const opacityMockupHome = useTransform(
    scrollYProgress,
    [0.4, 0.6, 0.7],
    [0, 1, 0]
  );
  const displayMockupHome = useDisplay(
    opacityMockupHome as MotionValue<unknown>
  );

  const opacityMockupCompatibility = opacityComp;
  const displayMockupCompatibility = useDisplay(
    opacityMockupCompatibility as MotionValue<unknown>
  );

  const texts = {
    en: {
      title: "AstroMood app\nConnected to your stars",
      subtitle:
        activeTab === "chart"
          ? "Discover more about your natal chart"
          : "Daily affirmations & horoscope",
      homeText:
        "Your daily ritual, aligned with the universe Start each day with personalized horoscopes and powerful affirmations to guide your mood and mindset. AstroMood brings you simple, uplifting guidance that keeps you grounded and glowing—every single day.",
      compatibilityText:
        "Are your vibes in sync? Discover the true potential of your connections—romantic, professional, or friendly. AstroMood's compatibility insights help you understand who energizes you, who challenges you, and how to navigate every bond with clarity and heart.",
    },
    fr: {
      title: "AstroMood L'app\nConnectée à tes étoiles",
      subtitle:
        activeTab === "chart"
          ? "Découvrer plus sur votre chart natal"
          : "Affirmation & Horoscope régulier",
      homeText:
        "Votre rituel quotidien, aligné avec l'univers. Commencez chaque journée avec des horoscopes personnalisés et des affirmations puissantes pour guider votre humeur et votre état d'esprit. AstroMood vous apporte des conseils simples et édifiants qui vous gardent ancré et rayonnant—chaque jour.",
      compatibilityText:
        "Vos vibrations sont-elles synchronisées? Découvrez le véritable potentiel de vos connexions—romantiques, professionnelles ou amicales. Les insights de compatibilité d'AstroMood vous aident à comprendre qui vous énergise, qui vous défie, et comment naviguer chaque lien avec clarté et cœur.",
    },
  };

  const isDark = theme === "dark";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";

  return (
    <div ref={containerRef} className="min-h-[200vh] relative">
      <div className="sticky top-0 min-h-screen">
        <section className="min-h-screen grid grid-cols-1 md:grid-cols-[0.8fr_1fr] items-center justify-center justify-items-center p-4">
          <div className="grid grid-rows-[1fr_1fr] gap-1 items-baseline">
            <div className="text">
              <motion.h1
                className={`md:text-[2.5rem] text-2xl font-extrabold drop-shadow-[0_0_10px_#795c5299] leading-tight whitespace-pre-line transition-all duration-500 ${textColor}`}
                style={{
                  opacity: opacityChart,
                  display: displayChart,
                  textAlign: "left",
                }}
              >
                {texts[language].title}
              </motion.h1>

              <motion.p
                className={`text-lg italic drop-shadow-[0_0_6px_rgba(255,191,150,0.4)] mt-4 ${textColor}`}
                style={{ opacity: opacityChart, display: displayChart }}
              >
                {texts[language].subtitle}
              </motion.p>

              <motion.p
                className={`text-lg mt-4 ${textColor}`}
                style={{ opacity: opacityHome, display: displayHome }}
              >
                {texts[language].homeText}
              </motion.p>

              <motion.p
                className={`text-lg mt-4 drop-shadow-[0_0_6px_rgba(255,191,150,0.4)] ${textColor}`}
                style={{ opacity: opacityComp, display: displayComp }}
              >
                {texts[language].compatibilityText}
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
            {/* Zodiac CHART */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: opacityZodiacChart,
                display: displayZodiacChart,
              }}
            >
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
            </motion.div>

            {/* Zodiac DAILY */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: opacityZodiacDaily,
                display: displayZodiacDaily,
              }}
            >
              <Image
                src={
                  theme === "dark"
                    ? "/assets/dark/daily_dark.png"
                    : "/assets/light/daily.png"
                }
                alt="Astro background home"
                fill
                className="object-contain animate-float-x"
              />
            </motion.div>

            {/* Zodiac COMPATIBILITY */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: opacityZodiacCompatibility,
                display: displayZodiacCompatibility,
              }}
            >
              <Image
                src={
                  theme === "dark"
                    ? "/assets/dark/compability_dark.png"
                    : "/assets/light/compatibility_light.png"
                }
                alt="Astro background compatibility"
                fill
                className="object-contain animate-float-x"
              />
            </motion.div>

            {/* MOCKUP CHART */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                opacity: opacityMockupChart,
                display: displayMockupChart,
              }}
            >
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
            </motion.div>

            {/* MOCKUP HOME */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: opacityMockupHome, display: displayMockupHome }}
            >
              <Image
                src={
                  theme === "dark"
                    ? "/assets/dark/mockup_home_dark.png"
                    : "/assets/light/mockup_home.png"
                }
                alt="Phone home"
                width={300}
                height={300}
              />
            </motion.div>

            {/* MOCKUP COMPATIBILITY */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                opacity: opacityMockupCompatibility,
                display: displayMockupCompatibility,
              }}
            >
              <Image
                src={
                  theme === "dark"
                    ? "/assets/dark/mockup_compability_dark.png"
                    : "/assets/light/mockup_compatibility.png"
                }
                alt="Phone compatibility"
                width={300}
                height={300}
              />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
