"use client";

//import Image from "next/image";
export default function Footer() {
  return (
    <>
      <div
        className="absolute bottom-0 left-0 w-full h-[20%] z-2 opacity-60 blur-2xl"
        style={{
          backgroundImage:
            "linear-gradient(to right top, rgba(34,5,55,0) 0%, #220537 25%, #270b41 50%, #2f1655 75%, #331c60 100%)",
        }}
      />
    </>
  );
}
