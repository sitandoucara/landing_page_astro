"use client";

interface FooterProps {
  language: "en" | "fr";
  theme: "light" | "dark";
}

export default function Footer({ language, theme }: FooterProps) {
  const footerTexts = {
    en: {
      rights: "© 2025 My AstroMood. All rights reserved.",
      built: "Built by Si_Graph",
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
    },
    fr: {
      rights: "© 2025 AstroMood. Tous droits réservés.",
      built: "Conçu par Si_Graph",
      privacy: "Politique de confidentialité",
      terms: "Conditions générales",
    },
  };

  const isDark = theme === "dark";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";
  const borderColor = isDark ? "border-[#F2EAE0]" : "border-[#7b635a]";

  return (
    <footer
      className={`z-2 border-t mt-2 transition-all duration-500 ${borderColor}`}
    >
      <div
        className={`flex gap-2 justify-center md:justify-between items-center h-full px-6 py-4 text-sm transition-all duration-500 ${textColor}`}
      >
        <p>{footerTexts[language].rights}</p>
        <p>{footerTexts[language].built}</p>
        <p>{footerTexts[language].privacy}</p>
        <p>{footerTexts[language].terms}</p>
      </div>
    </footer>
  );
}
