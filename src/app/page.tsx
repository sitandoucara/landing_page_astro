"use client";

import Nav from "./components/nav";
import Main from "./components/main";
import Footer from "./components/footer";
import Loading from "./components/loading";
import ParticlesCursor from "./components/particles-cursor";
//import Image from "next/image";

export default function Home() {
  return (
    <div
      className="relative min-h-screen  flex flex-col justify-between overflow-y-auto bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/night.webp')` }}
    >
      <ParticlesCursor />
      <Loading />
      <Nav />
      <Main />

      {/* Image décorative en bas de page */}
      <Footer />
    </div>
  );
}
