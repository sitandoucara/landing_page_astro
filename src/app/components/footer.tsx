"use client";

export default function Footer() {
  return (
    <div className="relative w-full mt-10 h-[8vh]">
      {/* fond décoratif flouté */}
      <div
        className="absolute inset-0 z-0 opacity-60 blur-2xl pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #73492d, #905833, #af6738, #ce763e, #ef8644)",
        }}
      />

      {/* contenu visible */}
      <div className="relative z-10 flex flex-wrap gap-2 justify-center md:justify-between items-center h-full px-6 py-4 text-white text-sm">
        <p>© 2025 AstroMood. All rights reserved.</p>
        <p>Built by Si_Graph</p>
        <p>Privacy Policy</p>
        <p>Terms and Conditions</p>
      </div>
    </div>
  );
}
