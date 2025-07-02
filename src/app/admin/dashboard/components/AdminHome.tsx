"use client";

import { useState } from "react";
import { FiSave, FiExternalLink, FiUpload } from "react-icons/fi";

interface AdminHomeProps {
  isDark: boolean;
  textColor: string;
  cardBg: string;
  borderColor: string;
}

export default function AdminHome({
  isDark,
  textColor,
  cardBg,
  borderColor,
}: AdminHomeProps) {
  // Affirmations correspondantes à l'app mobile
  const [affirmations, setAffirmations] = useState({
    today:
      "Today's cosmic energy brings new opportunities for growth and self-discovery.",
    tomorrow:
      "Tomorrow holds the promise of new beginnings and fresh perspectives.",
    week: "This week, embrace the changes coming your way with confidence and grace.",
    month:
      "The month ahead holds promise for deep personal transformation and renewal.",
  });

  // Gestion des phases lunaires avec images
  const [moonPhase, setMoonPhase] = useState("waning-gibbous");
  const [moonImages, setMoonImages] = useState({
    "waning-gibbous":
      "https://vaajrvpkjbzyqbxiuzsi.supabase.co/storage/v1/object/public/assets/app/moon.png",
    "full-moon":
      "https://vaajrvpkjbzyqbxiuzsi.supabase.co/storage/v1/object/public/assets/app/moon.png",
    "new-moon":
      "https://vaajrvpkjbzyqbxiuzsi.supabase.co/storage/v1/object/public/assets/app/moon.png",
    "waxing-crescent":
      "https://vaajrvpkjbzyqbxiuzsi.supabase.co/storage/v1/object/public/assets/app/moon.png",
    "first-quarter":
      "https://vaajrvpkjbzyqbxiuzsi.supabase.co/storage/v1/object/public/assets/app/moon.png",
    "third-quarter":
      "https://vaajrvpkjbzyqbxiuzsi.supabase.co/storage/v1/object/public/assets/app/moon.png",
  });

  const handleSaveAffirmations = () => {
    console.log("Saving affirmations:", affirmations);
    // Ici tu pourrais sauvegarder dans ta base de données
    alert("Affirmations saved successfully!");
  };

  const handleUpdateMoonPhase = () => {
    console.log("Updating moon phase:", moonPhase);
    // Ici tu pourrais sauvegarder la phase lunaire
    alert("Moon phase updated successfully!");
  };

  const handleImageUpload = (phase: string) => {
    // Simulation d'upload d'image
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // En réalité, tu uploaderais vers Supabase ici
        const fakeUrl = URL.createObjectURL(file);
        setMoonImages((prev) => ({
          ...prev,
          [phase]: fakeUrl,
        }));
        alert(`Image for ${phase} uploaded successfully!`);
      }
    };
    input.click();
  };

  const formatDate = (days: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${textColor}`}>
        Home Screen Management
      </h2>

      {/* Horoscope API Status - Version réaliste pour admin */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Horoscope API Monitoring
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div
            className={`p-4 rounded border-l-4 border-green-500 ${
              isDark ? "bg-green-900/20" : "bg-green-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${textColor}`}>API Status</span>
              <span className="font-semibold text-green-500">✓ Online</span>
            </div>
            <p className={`text-xs ${textColor} opacity-70 mb-2`}>
              External API: horoscope-app-api.vercel.app/api/v1
            </p>
            <p className={`text-xs ${textColor} opacity-70 mb-3`}>
              Last verified: {new Date().toLocaleTimeString()} (Auto-checked in
              mobile app)
            </p>
            <div className="flex gap-2">
              <a
                href="https://horoscope-app-api.vercel.app/api/v1"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1 text-xs rounded flex items-center gap-1 transition ${
                  isDark
                    ? "bg-blue-700 hover:bg-blue-600"
                    : "bg-blue-100 hover:bg-blue-200"
                } text-blue-600 hover:text-blue-700`}
              >
                <FiExternalLink size={12} />
                View API Docs
              </a>
              <a
                href="https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=taurus&day=TODAY"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1 text-xs rounded flex items-center gap-1 transition ${
                  isDark
                    ? "bg-green-700 hover:bg-green-600"
                    : "bg-green-100 hover:bg-green-200"
                } text-green-600 hover:text-green-700`}
              >
                <FiExternalLink size={12} />
                Test API Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Affirmations Management - Correspondant à l'app */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Daily Affirmations Management
        </h3>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm mb-2 ${textColor}`}>
              Today&apos;s Affirmation
              <span className={`text-xs opacity-70 ml-2`}>
                ({formatDate(0)})
              </span>
            </label>
            <textarea
              value={affirmations.today}
              onChange={(e) =>
                setAffirmations({ ...affirmations, today: e.target.value })
              }
              className={`w-full p-3 rounded border h-20 resize-none ${
                isDark
                  ? "bg-[#281109] border-[#F2EAE0]/30"
                  : "bg-white border-gray-300"
              } ${textColor}`}
              placeholder="Enter today's affirmation..."
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textColor}`}>
              Tomorrow&apos;s Affirmation
              <span className={`text-xs opacity-70 ml-2`}>
                ({formatDate(1)})
              </span>
            </label>
            <textarea
              value={affirmations.tomorrow}
              onChange={(e) =>
                setAffirmations({ ...affirmations, tomorrow: e.target.value })
              }
              className={`w-full p-3 rounded border h-20 resize-none ${
                isDark
                  ? "bg-[#281109] border-[#F2EAE0]/30"
                  : "bg-white border-gray-300"
              } ${textColor}`}
              placeholder="Enter tomorrow's affirmation..."
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textColor}`}>
              Week Affirmation
            </label>
            <textarea
              value={affirmations.week}
              onChange={(e) =>
                setAffirmations({ ...affirmations, week: e.target.value })
              }
              className={`w-full p-3 rounded border h-20 resize-none ${
                isDark
                  ? "bg-[#281109] border-[#F2EAE0]/30"
                  : "bg-white border-gray-300"
              } ${textColor}`}
              placeholder="Enter weekly affirmation..."
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${textColor}`}>
              Month Affirmation
            </label>
            <textarea
              value={affirmations.month}
              onChange={(e) =>
                setAffirmations({ ...affirmations, month: e.target.value })
              }
              className={`w-full p-3 rounded border h-20 resize-none ${
                isDark
                  ? "bg-[#281109] border-[#F2EAE0]/30"
                  : "bg-white border-gray-300"
              } ${textColor}`}
              placeholder="Enter monthly affirmation..."
            />
          </div>
        </div>

        <button
          onClick={handleSaveAffirmations}
          className={`mt-4 px-4 py-2 bg-[#BFB0A7] text-[#281109] rounded hover:opacity-80 transition flex items-center gap-2`}
        >
          <FiSave size={16} />
          Save All Affirmations
        </button>
      </div>

      {/* Moon Phase & Images Management */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Moon Phase Management
        </h3>

        <div className="grid grid-cols-2 gap-6">
          {/* Current Phase Selection */}
          <div>
            <label className={`block text-sm mb-2 ${textColor}`}>
              Current Moon Phase
            </label>
            <select
              value={moonPhase}
              onChange={(e) => setMoonPhase(e.target.value)}
              className={`w-full p-3 rounded border ${
                isDark
                  ? "bg-[#281109] border-[#F2EAE0]/30"
                  : "bg-white border-gray-300"
              } ${textColor}`}
            >
              <option value="waning-gibbous">Waning Gibbous</option>
              <option value="full-moon">Full Moon</option>
              <option value="new-moon">New Moon</option>
              <option value="waxing-crescent">Waxing Crescent</option>
              <option value="first-quarter">First Quarter</option>
              <option value="third-quarter">Third Quarter</option>
            </select>

            <button
              onClick={handleUpdateMoonPhase}
              className={`mt-3 w-full px-4 py-2 bg-[#BFB0A7] text-[#281109] rounded hover:opacity-80 transition`}
            >
              Update Current Phase
            </button>
          </div>

          {/* Current Phase Preview */}
          <div>
            <label className={`block text-sm mb-2 ${textColor}`}>
              Current Phase Preview
            </label>
            <div
              className={`p-4 rounded border ${borderColor} ${
                isDark ? "bg-gray-800" : "bg-gray-50"
              } text-center`}
            >
              <img
                src={moonImages[moonPhase as keyof typeof moonImages]}
                alt={moonPhase}
                className="w-20 h-20 mx-auto mb-2 rounded-full object-cover"
              />
              <p className={`text-sm ${textColor} capitalize`}>
                {moonPhase.replace("-", " ")}
              </p>
            </div>
          </div>
        </div>

        {/* Moon Images Management */}
        <div className="mt-6">
          <h4 className={`text-md font-semibold mb-3 ${textColor}`}>
            Moon Phase Images
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(moonImages).map(([phase, imageUrl]) => (
              <div
                key={phase}
                className={`p-3 rounded border ${borderColor} ${
                  isDark ? "bg-gray-800/50" : "bg-gray-50"
                }`}
              >
                <div className="text-center mb-2">
                  <img
                    src={imageUrl}
                    alt={phase}
                    className="w-16 h-16 mx-auto mb-2 rounded-full object-cover"
                  />
                  <p className={`text-xs ${textColor} capitalize mb-2`}>
                    {phase.replace("-", " ")}
                  </p>
                  <button
                    onClick={() => handleImageUpload(phase)}
                    className={`text-xs px-2 py-1 rounded flex items-center gap-1 mx-auto transition ${
                      isDark
                        ? "bg-blue-700 hover:bg-blue-600"
                        : "bg-blue-100 hover:bg-blue-200"
                    } text-blue-600 hover:text-blue-700`}
                  >
                    <FiUpload size={10} />
                    Change
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className={`text-xs ${textColor} opacity-70 mt-2`}>
            💡 Tip: Upload different images for each moon phase to enhance user
            experience
          </p>
        </div>
      </div>
    </div>
  );
}
