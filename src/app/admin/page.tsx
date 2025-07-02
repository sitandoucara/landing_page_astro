// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";

// Icônes correspondant à ton app mobile
import {
  IoMoon, // Home
  IoStar, // Explore
  IoPlanet, // Chart
  IoHeart, // Compatibility
  IoPerson, // Users (ex-Profile)
} from "react-icons/io5";

// Import des composants modulaires
import AdminHome from "./components/AdminHome";
import AdminChart from "./components/AdminChart";
import AdminCompatibility from "./components/AdminCompatibility";
import AdminUsers from "./components/AdminUsers";
import AdminExplore from "./components/AdminExplore";

export default function AdminPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState("home");
  const [language, setLanguage] = useState<"en" | "fr">("en");

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#281109]" : "bg-[#f2eae0]";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";
  const cardBg = isDark ? "bg-[#3D2918]" : "bg-white";
  const borderColor = isDark ? "border-[#F2EAE0]/20" : "border-[#7b635a]/20";

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const menuItems = [
    { id: "home", label: "Home", icon: IoMoon },
    { id: "explore", label: "Explore", icon: IoStar },
    { id: "chart", label: "Chart", icon: IoPlanet },
    { id: "compatibility", label: "Compatibility", icon: IoHeart },
    { id: "users", label: "Users", icon: IoPerson },
  ];

  // Props communes pour tous les composants
  const commonProps = {
    isDark,
    textColor,
    cardBg,
    borderColor,
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <AdminHome {...commonProps} />;
      case "explore":
        return <AdminExplore {...commonProps} />;
      case "chart":
        return <AdminChart {...commonProps} />;
      case "compatibility":
        return <AdminCompatibility {...commonProps} />;
      case "users":
        return <AdminUsers {...commonProps} />;
      default:
        return <AdminHome {...commonProps} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${bgColor}`}>
      {/* Header */}
      <header className={`border-b ${borderColor} ${cardBg}`}>
        <div className="flex justify-between items-center p-4">
          <h1 className={`text-2xl font-bold ${textColor}`}>AstroMood Admin</h1>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? (
                <PiMoonStarsFill
                  className={`text-2xl ${textColor} hover:opacity-80 transition`}
                />
              ) : (
                <PiSunDimFill
                  className={`text-2xl ${textColor} hover:opacity-80 transition`}
                />
              )}
            </button>

            <button
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              className={`px-3 py-1 border rounded ${borderColor} ${textColor} hover:opacity-80 transition`}
            >
              {language === "en" ? "FR" : "EN"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className={`w-64 ${cardBg} border-r ${borderColor} p-4`}>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                    activeTab === item.id
                      ? "bg-[#BFB0A7] text-[#281109]"
                      : `${textColor} hover:bg-[#BFB0A7]/20`
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
