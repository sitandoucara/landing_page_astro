"use client";

import Image from "next/image";
import StarGlow from "./StarGlow";

const starPositions = [
  { top: "10%", left: "15%" },
  { top: "20%", right: "10%" },
  { bottom: "15%", left: "20%" },
  { bottom: "10%", right: "15%" },
  { top: "50%", left: "45%" },
];

export default function Section2() {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* 5 étoiles réparties dans l'espace */}
      {starPositions.map((pos, index) => (
        <div
          key={index}
          className="absolute z-0"
          style={{
            ...pos,
          }}
        >
          <StarGlow />
        </div>
      ))}

      {/* contenu visible */}
      <div className="h-[80vh] grid items-center">
        <div className="relative z-10 grid grid-cols-2 justify-center md:justify-between items-center px-6 py-4 text-white text-sm">
          <div className="border-[#EF8644] p-6">
            <h2>Daily Transit</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium odit eius debitis doloremque ducimus consectetur ea
              ipsum. A, quaerat ipsa suscipit similique et impedit, sit
              dignissimos facilis animi iste debitis?
            </p>
          </div>
          <div className="border-l border-[#EF8644] p-10">
            <h2>Daily Transit</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium odit eius debitis doloremque ducimus consectetur ea
              ipsum. A, quaerat ipsa suscipit similique et impedit, sit
              dignissimos facilis animi iste debitis?
            </p>
          </div>
          <div className="border-t border-[#EF8644] p-10">
            <h2>Daily Transit</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium odit eius debitis doloremque ducimus consectetur ea
              ipsum. A, quaerat ipsa suscipit similique et impedit, sit
              dignissimos facilis animi iste debitis?
            </p>
          </div>
          <div className="border-l border-t border-[#EF8644] p-10">
            <h2>Daily Transit</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium odit eius debitis doloremque ducimus consectetur ea
              ipsum. A, quaerat ipsa suscipit similique et impedit, sit
              dignissimos facilis animi iste debitis?
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/assets/astro-centre.png"
            alt="Phone"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
