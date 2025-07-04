"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import Lottie from "lottie-react";

interface Header2Props {
  language: "en" | "fr";
  theme: "light" | "dark";
}

export default function Header2({ language, theme }: Header2Props) {
  const containerRef = useRef(null);
  const [bookAnimationData, setBookAnimationData] = useState(null);
  const [quizzAnimationData, setQuizzAnimationData] = useState(null);

  // load lottie animation
  useEffect(() => {
    fetch("/assets/book.json")
      .then((response) => response.json())
      .then((data) => setBookAnimationData(data))
      .catch((error) =>
        console.error("Erreur lors du chargement de l'animation book:", error)
      );

    // load quizz animation
    fetch("/assets/quizz.json")
      .then((response) => response.json())
      .then((data) => setQuizzAnimationData(data))
      .catch((error) =>
        console.error("Erreur lors du chargement de l'animation quizz:", error)
      );
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // hook for good animation
  function useDisplay(opacity: MotionValue<unknown>) {
    const [display, setDisplay] = useState<"block" | "none">("block");

    useMotionValueEvent(opacity, "change", (v) => {
      if (typeof v === "number" && v <= 0.05) {
        setDisplay("none");
      } else {
        setDisplay("block");
      }
    });

    return display;
  }

  const [activeTab, setActiveTab] = useState<
    "home" | "compatibility" | "learn" | "quizz"
  >("home");

  // Change elemenet with scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.75 && activeTab !== "quizz") {
      setActiveTab("quizz");
    } else if (latest >= 0.5 && latest <= 0.75 && activeTab !== "learn") {
      setActiveTab("learn");
    } else if (
      latest >= 0.25 &&
      latest <= 0.5 &&
      activeTab !== "compatibility"
    ) {
      setActiveTab("compatibility");
    } else if (latest < 0.25 && activeTab !== "home") {
      setActiveTab("home");
    }
  });

  // OPACITÉS avec transitions plus douces
  const opacityHome = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.35],
    [1, 1, 1, 0]
  );

  const opacityComp = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.5, 0.6],
    [0, 1, 1, 0]
  );

  const opacityLearn = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.75, 0.85],
    [0, 1, 1, 0]
  );

  const opacityQuizz = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  // img bckg animation
  const opacityZodiacDaily = opacityHome;
  const displayZodiacDaily = useDisplay(
    opacityZodiacDaily as MotionValue<unknown>
  );

  const opacityZodiacCompatibility = opacityComp;
  const displayZodiacCompatibility = useDisplay(
    opacityZodiacCompatibility as MotionValue<unknown>
  );

  // Animation Lottie for Learn
  const opacityLottieLearn = opacityLearn;
  const displayLottieLearn = useDisplay(
    opacityLottieLearn as MotionValue<unknown>
  );

  // Animation Lottie for Quizz
  const opacityLottieQuizz = opacityQuizz;
  const displayLottieQuizz = useDisplay(
    opacityLottieQuizz as MotionValue<unknown>
  );

  // MOCKUPS
  const opacityMockupHome = opacityHome;
  const displayMockupHome = useDisplay(
    opacityMockupHome as MotionValue<unknown>
  );

  const opacityMockupCompatibility = opacityComp;
  const displayMockupCompatibility = useDisplay(
    opacityMockupCompatibility as MotionValue<unknown>
  );

  const opacityMockupLearn = opacityLearn;
  const displayMockupLearn = useDisplay(
    opacityMockupLearn as MotionValue<unknown>
  );

  const opacityMockupQuizz = opacityQuizz;
  const displayMockupQuizz = useDisplay(
    opacityMockupQuizz as MotionValue<unknown>
  );

  // mockup animation
  const mockupScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  const mockupRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, -2]);

  // background animation (ex:daily)
  const bgScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [1, 0.85, 0.85, 1]
  );

  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const texts = {
    en: {
      title: "AstroMood app\nConnected to your stars",
      homeSubtitle: "Daily affirmations & horoscope",
      compatibilitySubtitle: "Discover relationship compatibility",
      learnSubtitle: "Learn with different courses",
      quizzSubtitle: "Test your astrological knowledge",
      homeText:
        "Your daily ritual, aligned with the universe. Start each day with personalized horoscopes and powerful affirmations to guide your mood and mindset. AstroMood brings you simple, uplifting guidance that keeps you grounded and glowing—every single day.",
      compatibilityText:
        "Are your vibes in sync? Discover the true potential of your connections—romantic, professional, or friendly. AstroMood's compatibility insights help you understand who energizes you, who challenges you, and how to navigate every bond with clarity and heart.",
      learnText:
        "Learn with different courses, also available as audiobooks. Expand your astrological knowledge through comprehensive lessons designed to deepen your cosmic understanding and spiritual growth.",
      quizzText:
        "Challenge yourself with fun quizzes and discover how much you really know about astrology. Test your cosmic knowledge and learn fascinating facts about the stars, planets, and zodiac signs.",
    },
    fr: {
      title: "AstroMood L'app\nConnectée à tes étoiles",
      homeSubtitle: "Affirmations & Horoscope quotidien",
      compatibilitySubtitle: "Découvrez la compatibilité relationnelle",
      learnSubtitle: "Apprends avec les différents cours",
      quizzSubtitle: "Testez vos connaissances astrologiques",
      homeText:
        "Votre rituel quotidien, aligné avec l'univers. Commencez chaque journée avec des horoscopes personnalisés et des affirmations puissantes pour guider votre humeur et votre état d'esprit. AstroMood vous apporte des conseils simples et édifiants qui vous gardent ancré et rayonnant—chaque jour.",
      compatibilityText:
        "Vos vibrations sont-elles synchronisées? Découvrez le véritable potentiel de vos connexions—romantiques, professionnelles ou amicales. Les insights de compatibilité d'AstroMood vous aident à comprendre qui vous énergise, qui vous défie, et comment naviguer chaque lien avec clarté et cœur.",
      learnText:
        "Apprends avec les différents cours, disponible aussi en livre audio. Élargissez vos connaissances astrologiques grâce à des leçons complètes conçues pour approfondir votre compréhension cosmique et votre croissance spirituelle.",
      quizzText:
        "Défiez-vous avec des quiz amusants et découvrez à quel point vous connaissez vraiment l'astrologie. Testez vos connaissances cosmiques et apprenez des faits fascinants sur les étoiles, planètes et signes du zodiaque.",
    },
  };

  const getCurrentTexts = () => {
    switch (activeTab) {
      case "home":
        return {
          subtitle: texts[language].homeSubtitle,
          content: texts[language].homeText,
        };
      case "compatibility":
        return {
          subtitle: texts[language].compatibilitySubtitle,
          content: texts[language].compatibilityText,
        };
      case "learn":
        return {
          subtitle: texts[language].learnSubtitle,
          content: texts[language].learnText,
        };
      case "quizz":
        return {
          subtitle: texts[language].quizzSubtitle,
          content: texts[language].quizzText,
        };
      default:
        return {
          subtitle: texts[language].homeSubtitle,
          content: texts[language].homeText,
        };
    }
  };

  const currentTexts = getCurrentTexts();
  const isDark = theme === "dark";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";

  return (
    <div ref={containerRef} className="min-h-[200vh] relative">
      <div className="sticky top-0 min-h-screen">
        <section className="min-h-screen grid grid-cols-1 md:grid-cols-[0.8fr_1fr] items-center justify-center justify-items-center p-4">
          {/* TEXT all header */}
          <div className="grid grid-rows-[1fr_auto] gap-8 items-start">
            <div className="text max-w-lg">
              <motion.h1
                className={`md:text-[2.5rem] text-2xl font-extrabold drop-shadow-[0_0_10px_#795c5299] leading-tight whitespace-pre-line transition-all duration-700 ${textColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {texts[language].title}
              </motion.h1>

              <motion.p
                key={`subtitle-${activeTab}`}
                className={`text-lg italic drop-shadow-[0_0_6px_rgba(255,191,150,0.4)] mt-4 ${textColor}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {currentTexts.subtitle}
              </motion.p>

              <motion.p
                key={`content-${activeTab}`}
                className={`text-lg leading-relaxed mt-4 ${textColor}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                {currentTexts.content}
              </motion.p>
            </div>

            {/* Btns APP STORE */}
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/assets/App_Store.png"
                  alt="App Store"
                  width={150}
                  height={150}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="ml-2"
              >
                <Image
                  src="/assets/Google_Play.png"
                  alt="Google Play"
                  width={150}
                  height={150}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* ZONE with animations  */}
          <div className="relative z-3 w-[400px] h-[400px] md:w-[600px] md:h-[600px] overflow-hidden">
            {/* Zodiac DAILY - first */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: opacityZodiacDaily,
                display: displayZodiacDaily,
                scale: bgScale,
                rotate: bgRotate,
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
                className="object-contain"
              />
            </motion.div>

            {/* Zodiac COMPATIBILITY */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: opacityZodiacCompatibility,
                display: displayZodiacCompatibility,
                scale: bgScale,
                rotate: bgRotate,
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
                className="object-contain"
              />
            </motion.div>

            {/* Lottie LEARN Animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: opacityLottieLearn,
                display: displayLottieLearn,
                scale: bgScale,
              }}
            >
              {bookAnimationData && (
                <div>
                  <Lottie
                    animationData={bookAnimationData}
                    loop={true}
                    autoplay={true}
                    style={{
                      width: 600,
                      height: 600,
                      transform: "scale(1.3)",
                    }}
                  />
                </div>
              )}
            </motion.div>

            {/* Lottie QUIZZ Animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: opacityLottieQuizz,
                display: displayLottieQuizz,
                scale: bgScale,
              }}
            >
              {quizzAnimationData && (
                <div>
                  <Lottie
                    animationData={quizzAnimationData}
                    loop={true}
                    autoplay={true}
                    style={{
                      width: 600,
                      height: 600,
                      transform: "scale(1.22)",
                    }}
                  />
                </div>
              )}
            </motion.div>

            {/* MOCKUP HOME - Premier */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                opacity: opacityMockupHome,
                display: displayMockupHome,
                scale: mockupScale,
                rotate: mockupRotate,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
            </motion.div>

            {/* MOCKUP COMPATIBILITY */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                opacity: opacityMockupCompatibility,
                display: displayMockupCompatibility,
                scale: mockupScale,
                rotate: mockupRotate,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
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
            </motion.div>

            {/* MOCKUP learn */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                opacity: opacityMockupLearn,
                display: displayMockupLearn,
                scale: mockupScale,
                rotate: mockupRotate,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={
                    theme === "dark"
                      ? "/assets/dark/mockup_learn_dark.png"
                      : "/assets/light/mockup_learn.png"
                  }
                  alt="Phone learn"
                  width={300}
                  height={300}
                />
              </motion.div>
            </motion.div>

            {/* MOCKUP QUIZZ - FINAL */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                opacity: opacityMockupQuizz,
                display: displayMockupQuizz,
                scale: mockupScale,
                rotate: mockupRotate,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={
                    theme === "dark"
                      ? "/assets/dark/mockup_quizz_dark.png"
                      : "/assets/light/mockup_quizz.png"
                  }
                  alt="Phone quizz"
                  width={300}
                  height={300}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
