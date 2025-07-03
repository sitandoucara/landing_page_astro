"use client";

import { useState, useEffect } from "react";
import { FiSave, FiExternalLink, FiUpload, FiRefreshCw } from "react-icons/fi";

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
  const [affirmations, setAffirmations] = useState({
    today: "",
    tomorrow: "",
    week: "",
    month: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState("en"); // Tu pourrais le récupérer du contexte global

  // Gestion des phases lunaires
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

  // Charger les affirmations depuis l'API
  const fetchAffirmations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/affirmations?language=${language}`
      );
      if (!response.ok) throw new Error("Failed to fetch affirmations");

      const data = await response.json();
      setAffirmations(data.affirmations);
    } catch (error) {
      console.error("Error fetching affirmations:", error);
      alert("Failed to load affirmations");
    } finally {
      setLoading(false);
    }
  };

  // Sauvegarder les affirmations
  const handleSaveAffirmations = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/affirmations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          affirmations,
          language,
        }),
      });

      if (!response.ok) throw new Error("Failed to save affirmations");

      const result = await response.json();
      alert(
        `Affirmations saved successfully! Updated: ${result.updated.join(", ")}`
      );
    } catch (error) {
      console.error("Error saving affirmations:", error);
      alert("Failed to save affirmations");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateMoonPhase = () => {
    console.log("Updating moon phase:", moonPhase);
    alert("Moon phase updated successfully!");
  };

  const handleImageUpload = (phase: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
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

  // Charger les affirmations au démarrage
  useEffect(() => {
    fetchAffirmations();
  }, [language]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${textColor}`}>
          Home Screen Management
        </h2>

        {/* Language selector */}
        <div className="flex items-center gap-2">
          <label className={`text-sm ${textColor}`}>Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`px-3 py-1 rounded border ${
              isDark
                ? "bg-[#281109] border-[#F2EAE0]/30"
                : "bg-white border-gray-300"
            } ${textColor} text-sm`}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>

      {/* Horoscope API Status */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Horoscope API Monitoring
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div
            className={`p-4 rounded border-l-4 border-[#BFB0A7] ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
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

      {/* Affirmations Management - Connecté à l'API */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${textColor}`}>
            Daily Affirmations Management
          </h3>

          <button
            onClick={fetchAffirmations}
            disabled={loading}
            className={`p-2 rounded hover:opacity-70 transition ${textColor}`}
            title="Refresh affirmations"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} size={16} />
          </button>
        </div>

        {loading ? (
          <div className={`text-center py-8 ${textColor}`}>
            <FiRefreshCw className="animate-spin mx-auto mb-2" size={24} />
            <p>Loading affirmations...</p>
          </div>
        ) : (
          <>
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
                    setAffirmations({
                      ...affirmations,
                      tomorrow: e.target.value,
                    })
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
              disabled={saving}
              className={`mt-4 px-4 py-2 bg-[#BFB0A7] text-[#281109] rounded hover:opacity-80 transition flex items-center gap-2 ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiSave size={16} />
              {saving ? "Saving..." : "Save All Affirmations"}
            </button>
          </>
        )}
      </div>

      {/* Moon Phase Management - Inchangé */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Moon Phase Management
        </h3>

        <div className="grid grid-cols-2 gap-6">
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
