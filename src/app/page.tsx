"use client";

import { useState, useEffect } from "react";
import Main2 from "./components/main2";
import LoadingLight from "./components/loading_light";
import ParticlesCursor from "./components/particles-cursor";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [language, setLanguage] = useState<"en" | "fr">("en");

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f2eae0] relative overflow-hidden grain-overlay">
      <ParticlesCursor />

      {/* Main2 toujours monté, même pendant loading */}
      <Main2 language={language} setLanguage={setLanguage} />

      {/* Loading par-dessus, désactivé ensuite */}
      {showLoading && (
        <div className="absolute inset-0 z-[100] pointer-events-none">
          <LoadingLight language={language} />
        </div>
      )}
    </div>
  );
}
