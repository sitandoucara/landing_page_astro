"use client";

import Image from "next/image";

export default function Section5() {
  return (
    <div>
      <div className="relative h-[80vh] w-full overflow-hidden  flex flex-col items-center justify-end text-white">
        {/* Image de la planète */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[80vh] pointer-events-none z-0">
          <Image
            src="/assets/planet.png"
            alt="Planet"
            fill
            className="object-contain"
          />
        </div>
        {/* Effet de gradient fondu en bas */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-b from-transparent to-[#0E0E0E] z-10" />
        {/* Contenu centré */}
        <div className="relative z-20 text-center -translate-y-30 px-4">
          <p className="uppercase tracking-widest  text-sm ">Mobile App</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Download <span className="text-[#ef8644]">Our App</span>
          </h2>
          <p className="text-gray-300 text-lg mb-6">Right Now</p>
          {/* Boutons de téléchargement */}
          <div className="flex justify-center gap-4">
            <Image
              src="/assets/App_Store.webp"
              alt="App Store"
              width={150}
              height={50}
            />
            <Image
              src="/assets/Google_Play.webp"
              alt="Google Play"
              width={150}
              height={50}
            />
          </div>
        </div>
      </div>
      <div className="h-[15vh] w-full  bg-[#0E0E0E]"></div>

      <div className="w-full  h-[8vh] bg-[#0E0E0E]">
        {/* fond décoratif flouté */}

        {/* contenu visible */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-between items-center h-full px-6 py-4 text-white text-sm">
          <p>© 2025 AstroMood. All rights reserved.</p>
          <p>Built by Si_Graph</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
      </div>
    </div>
  );
}
