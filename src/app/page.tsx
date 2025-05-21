"use client";

import Nav from "./components/nav";
import Main from "./components/main";
//import Footer from "./components/footer";
import Loading from "./components/loading";
import ParticlesCursor from "./components/particles-cursor";
import Section2 from "./components/section2";
import Section3 from "./components/section3";
import Section4 from "./components/section4";
import Section5 from "./components/section5";
//import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#0E0E0E]">
      <ParticlesCursor />
      <div
        className="relative min-h-screen justify-between overflow-y-auto bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/night.webp')` }}
      >
        <Loading />
        <Nav />
        <Main />
      </div>

      <div className="absolute bottom-0 mt-2 blur-xl left-0 w-full h-[2vh] bg-gradient-to-b from-[#ac5a20] to-[#0d0601] z-2" />

      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      {/* Image décorative en bas de page */}
    </div>
  );
}
