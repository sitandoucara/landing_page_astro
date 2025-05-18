"use client";

import Image from "next/image";

export default function Main() {
  return (
    <div className="grid p-5 sm:p-20 grid-cols-1 md:grid-cols-2 items-center justify-center">
      {/* Texte à gauche */}
      <div className="text-center md:text-left">
        <h1 className="text-[2.5rem] sm:text-5xl font-extrabold text-[#e4d1ff] drop-shadow-[0_0_10px_rgba(228,209,255,0.6)] leading-tight">
          AstroMood app <br /> Connectée à tes étoiles
        </h1>

        <p className="mt-4 text-lg italic text-[#c1aaff] drop-shadow-[0_0_6px_rgba(193,170,255,0.4)]">
          Stars in the palm of your hand
        </p>
      </div>

      {/* Image à droite */}
      <div className="relative w-[580px] h-[580px] mt-10 md:mt-0">
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
