// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import {
  FiHome,
  FiHeart,
  FiMap,
  FiCompass,
  FiUser,
  FiToggleRight,
} from "react-icons/fi";

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
    { id: "home", label: "Home", icon: FiHome },
    { id: "compatibility", label: "Compatibility", icon: FiHeart },
    { id: "chart", label: "Chart", icon: FiMap },
    { id: "explore", label: "Explore", icon: FiCompass },
    { id: "profile", label: "Profile", icon: FiUser },
  ];

  const stats = {
    users: 1247,
    activeUsers: 892,
    chartsGenerated: 3456,
    compatibilityChecks: 2134,
  };

  // Données factices pour les différentes sections
  const sectionData = {
    home: {
      welcomeText: "Welcome to your stars",
      horoscopeDaily: "Today's cosmic energy brings new opportunities...",
    },
    compatibility: {
      featuredPair: "Virgo ♍ + Leo ♌",
      compatibilityScore: "87%",
    },
    explore: {
      lessonTitle: "Understanding Your Rising Sign",
      filterName: "Cosmic Harmony Filter",
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${textColor}`}>
              Home Screen Management
            </h2>

            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
                Welcome Message
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={sectionData.home.welcomeText}
                  className={`flex-1 p-3 rounded border ${
                    isDark
                      ? "bg-[#281109] border-[#F2EAE0]/30"
                      : "bg-white border-gray-300"
                  } ${textColor}`}
                  onChange={() => {}} // Factice
                />
                <button
                  className={`px-4 py-2 bg-[#BFB0A7] text-[#281109] rounded hover:opacity-80 transition`}
                >
                  Update
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
                Daily Horoscope
              </h3>
              <textarea
                value={sectionData.home.horoscopeDaily}
                className={`w-full p-3 rounded border h-24 ${
                  isDark
                    ? "bg-[#281109] border-[#F2EAE0]/30"
                    : "bg-white border-gray-300"
                } ${textColor}`}
                onChange={() => {}} // Factice
              />
              <button
                className={`mt-3 px-4 py-2 bg-[#BFB0A7] text-[#281109] rounded hover:opacity-80 transition`}
              >
                Save Changes
              </button>
            </div>
          </div>
        );

      case "compatibility":
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${textColor}`}>
              Compatibility Management
            </h2>

            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
                Featured Compatibility
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm mb-2 ${textColor}`}>
                    Zodiac Pair
                  </label>
                  <input
                    type="text"
                    value={sectionData.compatibility.featuredPair}
                    className={`w-full p-3 rounded border ${
                      isDark
                        ? "bg-[#281109] border-[#F2EAE0]/30"
                        : "bg-white border-gray-300"
                    } ${textColor}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${textColor}`}>
                    Score
                  </label>
                  <input
                    type="text"
                    value={sectionData.compatibility.compatibilityScore}
                    className={`w-full p-3 rounded border ${
                      isDark
                        ? "bg-[#281109] border-[#F2EAE0]/30"
                        : "bg-white border-gray-300"
                    } ${textColor}`}
                  />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
                Premium Features
              </h3>
              <div className="flex items-center justify-between">
                <span className={textColor}>Birth Chart Compatibility</span>
                <FiToggleRight className={`text-2xl ${textColor}`} />
              </div>
            </div>
          </div>
        );

      case "explore":
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${textColor}`}>
              Explore Content Management
            </h2>

            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
                Learning Content
              </h3>
              <input
                type="text"
                value={sectionData.explore.lessonTitle}
                className={`w-full p-3 rounded border ${
                  isDark
                    ? "bg-[#281109] border-[#F2EAE0]/30"
                    : "bg-white border-gray-300"
                } ${textColor}`}
              />
              <div className="mt-4 space-y-2">
                <label className={`block text-sm ${textColor}`}>
                  Lesson Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status" defaultChecked />
                    <span className={`text-sm ${textColor}`}>Published</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status" />
                    <span className={`text-sm ${textColor}`}>Draft</span>
                  </label>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
                AR Filters
              </h3>
              <input
                type="text"
                value={sectionData.explore.filterName}
                className={`w-full p-3 rounded border ${
                  isDark
                    ? "bg-[#281109] border-[#F2EAE0]/30"
                    : "bg-white border-gray-300"
                } ${textColor}`}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${textColor}`}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
              Management
            </h2>
            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <p className={textColor}>
                Configuration panel for {activeTab} section...
              </p>
            </div>
          </div>
        );
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

          {/* Stats */}
          <div className="mt-8 space-y-4">
            <h3 className={`text-sm font-semibold ${textColor} opacity-70`}>
              STATISTICS
            </h3>
            <div className="space-y-3">
              <div className={`flex justify-between text-sm ${textColor}`}>
                <span>Total Users</span>
                <span className="font-semibold">
                  {stats.users.toLocaleString()}
                </span>
              </div>
              <div className={`flex justify-between text-sm ${textColor}`}>
                <span>Active Users</span>
                <span className="font-semibold">
                  {stats.activeUsers.toLocaleString()}
                </span>
              </div>
              <div className={`flex justify-between text-sm ${textColor}`}>
                <span>Charts Generated</span>
                <span className="font-semibold">
                  {stats.chartsGenerated.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
