"use client";

import Image from "next/image";

export default function Section3() {
  return (
    <div className="h-[80vh] border-[#41210d]">
      {/* fond décoratif flouté */}

      {/* contenu visible */}
      <div className="h-[80vh]  grid items-center ">
        <h1 className="md:text-[2.5rem] text-center text-2xl font-extrabold text-[#EED1B4] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)] leading-tight">
          Decouvre en plus sur toi
        </h1>
        <div className=" grid grid-cols-3 justify-center justify-items-center md:justify-between items-center  px-6 py-4 text-white text-sm">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "Amina",
                word: "Apaisant!",
                text: "Un vrai moment de calme et de recentrage quotidien.",
              },
              {
                name: "Lucas",
                word: "Magique!",
                text: "L’expérience utilisateur est magnifique et l’appli est intuitive.",
              },
            ].map(({ name, word, text }, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-[#ef864433] border border-[#ef8644] rounded-2xl p-6 w-[250px] sm:w-[280px] text-left shadow-md transform hover:scale-[1.02] transition-all duration-300"
                style={{ backdropFilter: "blur(12px)" }}
              >
                <h3 className="text-sm text-[#EED1B4] mb-1">{name}</h3>
                <h4 className="text-xl font-bold text-[#ef8644] mb-2">
                  {word}
                </h4>
                <p className="text-sm text-white">{text}</p>
              </div>
            ))}
          </div>

          <div>
            <Image
              src="/assets/phone3.webp"
              alt="Phone"
              width={350}
              height={350}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "Amina",
                word: "Apaisant!",
                text: "Un vrai moment de calme et de recentrage quotidien.",
              },
              {
                name: "Lucas",
                word: "Magique!",
                text: "L’expérience utilisateur est magnifique et l’appli est intuitive.",
              },
            ].map(({ name, word, text }, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-[#ef864433] border border-[#ef8644] rounded-2xl p-6 w-[250px] sm:w-[280px] text-left shadow-md transform hover:scale-[1.02] transition-all duration-300"
                style={{ backdropFilter: "blur(12px)" }}
              >
                <h3 className="text-sm text-[#EED1B4] mb-1">{name}</h3>
                <h4 className="text-xl font-bold text-[#ef8644] mb-2">
                  {word}
                </h4>
                <p className="text-sm text-white">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
