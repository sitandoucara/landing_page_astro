"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading2() {
  const [startExit, setStartExit] = useState(false);
  const [hidden, setHidden] = useState(false);

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
      {/* PORTES */}
      <div
        className={`absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 transition-all duration-[3000ms] ease-[ease]`}
      >
        {/* GAUCHE */}

        <div
          className={`absolute top-0 left-0 h-full w-1/2 border-r-[3px]  border-[#7b635a] bg-[#f2eae0]  grain-overlay  bg-cover bg-center transition-transform duration-[3000ms] ease-[ease] delay-[2000ms] ${
            startExit ? "-translate-x-[110vw]" : ""
          }`}
        />

        {/* DROITE */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2 border-l-[3px]  border-[#7b635a] bg-[#f2eae0] grain-overlay  bg-cover bg-center transition-transform duration-[3000ms] ease-[ease] delay-[2000ms] ${
            startExit ? "translate-x-[110vw]" : ""
          }`}
        >
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full border-[3px] border-[#7b635a] z-2 bg-[#f2eae0] p-4">
            <Image
              src="/assets/zodiac_ligtht.png"
              alt="Astro loading"
              fill
              className={`object-contain ${
                startExit ? "" : "animate-slow-spin"
              }`}
            />

            {/* TEXTE CENTRÉ */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                startExit ? "opacity-0" : "opacity-100"
              }`}
            >
              <h1 className="text-xl sm:text-3xl text-center font-bold text-[#7b635a] drop-shadow-[0_0_10px_rgba(239,134,68,0.6)]">
                Welcome to AstroMood
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
