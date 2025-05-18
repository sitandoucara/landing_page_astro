"use client";

import Image from "next/image";

export default function Main() {
  return (
    <div className="grid p-2 gap-15 grid-cols-1 md:grid-cols-[0.8fr_1fr] items-center justify-center justify-items-center">
      {/* Texte à gauche */}
      <div className="text-center md:text-left">
        <h1 className="md:text-[2.5rem] text-2xl font-extrabold text-[#EED1B4] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)] leading-tight">
          AstroMood app <br /> Connectée à tes étoiles
        </h1>

        <p className="mt-4 text-lg italic text-[#ffbf96] drop-shadow-[0_0_6px_rgba(255,191,150,0.4)]">
          Stars in the palm of your hand
        </p>

        <div className="flex mt-4">
          <Image
            src="/assets/App_Store.webp"
            alt="App Store"
            width={150}
            height={150}
          />
          <Image
            src="/assets/Google_Play.webp"
            alt="Google Play"
            width={150}
            height={150}
            className="ml-2"
          />
        </div>
      </div>

      {/* Image à droite */}
      <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
        <Image
          src="/assets/zodiac.webp"
          alt="Astro background"
          fill
          className="object-contain"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/assets/phone.webp"
            alt="Phone"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
