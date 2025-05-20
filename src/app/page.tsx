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
    <div>
      <ParticlesCursor />
      <div
        className="relative min-h-screen justify-between overflow-y-auto bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/night.webp')` }}
      >
        <Loading />
        <Nav />
        <Main />
      </div>
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      {/* Image décorative en bas de page */}
    </div>
  );
}
