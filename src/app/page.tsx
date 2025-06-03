"use client";

import { useState, useEffect } from "react";
import Main2 from "./components/main2";
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

  return (
    <div className="min-h-screen  relative  grain-overlay">
      <ParticlesCursor />

      <Main2
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {showLoading && (
        <div className="absolute inset-0 z-[100] pointer-events-none">
          <Loading2 language={language} theme={pendingTheme ?? theme} />
        </div>
      )}
    </div>
  );
}
