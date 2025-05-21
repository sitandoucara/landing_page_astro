"use client";

import Image from "next/image";

import { PiMoonStarsFill } from "react-icons/pi";
//import { PiSunFill } from "react-icons/pi";

export default function Main2() {
  return (
    <div className="relative min-h-screen grid grid-rows-[auto_1fr_auto] bg-[#f2eae0] overflow-hidden grain-overlay">
      {/*Nav*/}

      <nav className="flex border-b z-2 border-[#7b635a] justify-between items-center p-4">
        {/*<h1 className="text-2xl font-bold font-carattere text-[#EED1B4] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)]">
                AstroMood
              </h1>*/}
        <h1 className="text-2xl font-bold font-carattere text-[#7b635a] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)]">
          AstroMood
        </h1>

        <div className="flex  items-center gap-4">
          <button
            aria-label="Toggle dark mode"
            className="text-white text-2xl p-2 rounded-full hover:bg-[#331c60]/30 transition"
          >
            <PiMoonStarsFill className="cursor-pointer text-[#7b635a]" />
          </button>

          <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#7b635a]  text-sm sm:text-base font-bold flex items-center justify-center text-[#EED1B4] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)] hover:bg-[#331c60] transition">
            EN
          </button>
        </div>
      </nav>
      {/*Header*/}

      <div className="grid p-2  z-2 gap-15 grid-cols-1 md:grid-cols-[0.8fr_1fr] items-center justify-center justify-items-center">
        {/* Texte à gauche */}
        <div className="text-center md:text-left">
          <h1 className="md:text-[2.5rem] text-2xl font-extrabold text-[#7b635a] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)] leading-tight">
            AstroMood app <br /> Connectée à tes étoiles
          </h1>
          <p className="mt-4 text-lg italic text-[#7b635a] drop-shadow-[0_0_6px_rgba(255,191,150,0.4)]">
            Stars in the palm of your hand
          </p>
          <div className="flex mt-4">
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
        {/* Image à droite */}
        <div className="relative z-3 w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
          <Image
            src="/assets/zodiac_ligtht.png"
            alt="Astro background"
            fill
            className="object-contain"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/assets/phone.webp"
              alt="Phone"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>

      {/*Footer*/}
      <div className=" border-[#7b635a] z-2 border-t mt-2 ">
        {/* fond décoratif flouté */}
        {/* contenu visible */}
        <div className="flex  gap-2 text-[#7b635a] justify-center md:justify-between items-center h-full px-6 py-4  text-sm">
          <p>© 2025 AstroMood. All rights reserved.</p>
          <p>Built by Si_Graph</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
      </div>
    </div>
  );
}
