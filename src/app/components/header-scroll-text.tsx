"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollHeaderText({
  language,
}: {
  language: "en" | "fr";
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const opacityA = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const translateYA = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  const opacityB = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const translateYB = useTransform(scrollYProgress, [0.3, 0.6], [-100, 0]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Scrolling container */}
      <div ref={scrollRef} className="h-[200vh] w-full overflow-y-scroll">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div className="relative text-center">
            {/* Texte A */}
            <motion.h1
              style={{ opacity: opacityA, y: translateYA }}
              className="text-2xl md:text-4xl font-bold absolute inset-0 flex items-center justify-center"
            >
              {language === "en"
                ? "Connected to your stars"
                : "Connectée à tes étoiles"}
            </motion.h1>

            {/* Texte B */}
            <motion.p
              style={{ opacity: opacityB, y: translateYB }}
              className="text-xl md:text-3xl font-semibold absolute inset-0 flex items-center justify-center"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
