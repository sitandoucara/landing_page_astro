"use client";

import { useEffect, useState } from "react";

export default function Section4() {
  const originalCards = [
    {
      name: "Sophie",
      word: "Incroyable!",
      text: "J'utilise AstroMood chaque jour, c’est devenu mon rituel du matin.",
    },
    {
      name: "Léo",
      word: "Précis!",
      text: "Les prédictions sont justes et me guident dans mes décisions.",
    },
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
    {
      name: "Clara",
      word: "Lumineux!",
      text: "L’interface est fluide et agréable, un plaisir chaque jour.",
    },
    {
      name: "Noah",
      word: "Captivant!",
      text: "Je me sens aligné avec les étoiles grâce à cette appli.",
    },
    {
      name: "Jade",
      word: "Génial!",
      text: "Beaucoup de vérité dans les messages reçus quotidiennement.",
    },
    {
      name: "Milo",
      word: "Intuitif!",
      text: "Tout est clair et facile à suivre, j'adore!",
    },
  ];

  const visibleCount = 6;
  const cards = [...originalCards, ...originalCards.slice(0, visibleCount)];
  const [index, setIndex] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const cardWidth = 300;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // reset rapide à l'index 0 après le "clone"
  useEffect(() => {
    if (index === originalCards.length) {
      setTimeout(() => {
        setNoTransition(true);
        setIndex(0);
      }, 700); // attendre que la transition finisse
    } else {
      setNoTransition(false);
    }
  }, [index, originalCards.length]);

  const randomStyles = [
    "mt-0 rotate-[-2deg]",
    "mt-6 rotate-[2deg]",
    "mt-3 rotate-[1deg]",
    "mt-8 rotate-[-1deg]",
    "mt-5 rotate-[3deg]",
    "mt-2 rotate-[-3deg]",
    "mt-7 rotate-[1deg]",
    "mt-4 rotate-[2deg]",
  ];

  return (
    <section className="py-20 mt-10 h-[70vh] text-center relative overflow-hidden">
      <p className="uppercase tracking-widest text-[#ef8644] text-sm mb-2">
        Avis des utilisateurs
      </p>
      <h2 className="text-3xl md:text-5xl font-bold text-[#EED1B4] drop-shadow-[0_0_10px_rgba(239,134,68,0.6)] mb-16">
        Ce que disent nos clients
      </h2>

      <div className="relative w-full  py-2 overflow-hidden">
        <div
          className={`flex gap-6 ${
            noTransition ? "" : "transition-transform duration-700 ease-in-out"
          }`}
          style={{
            transform: `translateX(-${index * cardWidth}px)`,
          }}
        >
          {cards.map(({ name, word, text }, i) => (
            <div
              key={i}
              className={`backdrop-blur-xl bg-[#ef864433] border border-[#ef8644] rounded-2xl p-6 w-[260px] min-w-[260px] text-left shadow-md hover:scale-[1.02] transition-all duration-300 ${
                randomStyles[i % randomStyles.length]
              }`}
              style={{ backdropFilter: "blur(12px)" }}
            >
              <h3 className="text-sm text-[#EED1B4] mb-1">{name}</h3>
              <h4 className="text-xl font-bold text-[#ef8644] mb-2">{word}</h4>
              <p className="text-sm text-white">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
