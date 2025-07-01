"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Footer from "./components/footer";
import Loading2 from "./components/loading2";
import ParticlesCursor from "./components/particles-cursor";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [pendingTheme, setPendingTheme] = useState<"light" | "dark" | null>(
    null
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setPendingTheme(newTheme);
    setShowLoading(true);
  };

  useEffect(() => {
    let themeTimer: ReturnType<typeof setTimeout> | null = null;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    if (pendingTheme) {
      themeTimer = setTimeout(() => {
        setTheme(pendingTheme);
      }, 100);
    }
    hideTimer = setTimeout(() => {
      setShowLoading(false);
      setPendingTheme(null);
    }, 4000);

    return () => {
      if (themeTimer) clearTimeout(themeTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [pendingTheme]);

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#281109]" : "bg-[#f2eae0]";

  return (
    <div
      className={`min-h-screen relative grain-overlay transition-all duration-500 ${bgColor}`}
    >
      <ParticlesCursor />

      {/* Navigation fixe */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Header 1 - Section d'accueil */}
      <Header language={language} theme={theme} />

      {/* Header 2 - Section avec animations au scroll */}
      <Header2 language={language} theme={theme} />

      {/* Footer */}
      <Footer language={language} theme={theme} />

      {/* Loading overlay */}
      {showLoading && (
        <div className="absolute inset-0 z-[100] pointer-events-none">
          <Loading2 language={language} theme={pendingTheme ?? theme} />
        </div>
      )}
    </div>
  );
}
