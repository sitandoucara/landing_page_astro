// components/Header2.tsx
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

  // Charger les animations Lottie
  useEffect(() => {
    // Charger l'animation book
    fetch("/assets/book.json")
      .then((response) => response.json())
      .then((data) => setBookAnimationData(data))
      .catch((error) =>
        console.error("Erreur lors du chargement de l'animation book:", error)
      );

    // Charger l'animation quizz
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

  // Custom hook pour gérer l'affichage avec transition plus fluide
  function useDisplay(opacity: MotionValue<unknown>) {
    const [display, setDisplay] = useState<"block" | "none">("none");

    useMotionValueEvent(opacity, "change", (v) => {
      if (typeof v === "number" && v <= 0.05) {
        // Seuil légèrement plus élevé pour éviter les clignotements
        setDisplay("none");
      } else {
        setDisplay("block");
      }
    });

    return display;
  }

  // État pour l'onglet actif - COMMENCE PAR "home" (daily)
  const [activeTab, setActiveTab] = useState<
    "home" | "compatibility" | "learn" | "quizz"
  >("home");

  // Gestion du changement d'onglet basé sur le scroll - ORDRE MODIFIÉ (PAS DE RETOUR AU CHART)
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

  // DISPLAYS calculés dynamiquement
  const displayHome = useDisplay(opacityHome as MotionValue<unknown>);
  const displayComp = useDisplay(opacityComp as MotionValue<unknown>);
  const displayLearn = useDisplay(opacityLearn as MotionValue<unknown>);
  const displayQuizz = useDisplay(opacityQuizz as MotionValue<unknown>);

  // IMAGES BACKGROUND avec animations plus fluides
  const opacityZodiacDaily = opacityHome;
  const displayZodiacDaily = useDisplay(
    opacityZodiacDaily as MotionValue<unknown>
  );

  const opacityZodiacCompatibility = opacityComp;
  const displayZodiacCompatibility = useDisplay(
    opacityZodiacCompatibility as MotionValue<unknown>
  );

  // Animation Lottie pour Learn
  const opacityLottieLearn = opacityLearn;
  const displayLottieLearn = useDisplay(
    opacityLottieLearn as MotionValue<unknown>
  );

  // Animation Lottie pour Quizz
  const opacityLottieQuizz = opacityQuizz;
  const displayLottieQuizz = useDisplay(
    opacityLottieQuizz as MotionValue<unknown>
  );

  // MOCKUPS avec ordre modifié
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

  // Animations pour les mockups avec des effets plus sophistiqués
  const mockupScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  const mockupRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, -2]);

  // Animation pour les backgrounds avec rotation et scale
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Textes mis à jour avec le nouvel ordre
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

  // Fonction pour obtenir le texte actuel basé sur l'onglet actif
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
          {/* SECTION TEXTE - CENTRÉE FIXE */}
          <div className="flex flex-col justify-center h-full">
            <div className="text space-y-6">
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
                className={`text-lg italic drop-shadow-[0_0_6px_rgba(255,191,150,0.4)] ${textColor}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {currentTexts.subtitle}
              </motion.p>

              <motion.p
                key={`content-${activeTab}`}
                className={`text-lg leading-relaxed ${textColor}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                {currentTexts.content}
              </motion.p>
            </div>

            {/* BOUTONS APP STORE - POSITION FIXE */}
            <motion.div
              className="flex mt-8"
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

          {/* IMAGE ZONE avec animations améliorées */}
          <div className="relative z-3 w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
            {/* Zodiac DAILY - Premier */}
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
                <div
                  style={{
                    filter: isDark
                      ? "sepia(1) saturate(1.5) hue-rotate(30deg) brightness(0.9) contrast(1.1)" // Beige chaud pour dark
                      : "sepia(1) saturate(2) hue-rotate(15deg) brightness(0.6) contrast(1.2)", // Marron riche pour light
                  }}
                >
                  <Lottie
                    animationData={bookAnimationData}
                    loop={true}
                    autoplay={true}
                    style={{
                      width: 600,
                      height: 600,
                      transform: "scale(1.2)", // Agrandir encore plus
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
                <div
                  style={{
                    filter: isDark
                      ? "sepia(1) saturate(1.5) hue-rotate(30deg) brightness(0.9) contrast(1.1)" // Beige chaud pour dark
                      : "sepia(1) saturate(2) hue-rotate(15deg) brightness(0.6) contrast(1.2)", // Marron riche pour light
                  }}
                >
                  <Lottie
                    animationData={quizzAnimationData}
                    loop={true}
                    autoplay={true}
                    style={{
                      width: 600,
                      height: 600,
                      transform: "scale(1.2)", // Agrandir encore plus
                    }}
                  />
                </div>
              )}
            </motion.div>

            {/* Zodiac CHART - SUPPRIMÉ */}

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

            {/* MOCKUP LEARN */}
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
