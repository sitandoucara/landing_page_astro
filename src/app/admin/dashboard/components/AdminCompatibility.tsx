"use client";

import { useState } from "react";
import { FiSave } from "react-icons/fi";

interface AdminCompatibilityProps {
  isDark: boolean;
  textColor: string;
  cardBg: string;
  borderColor: string;
}

export default function AdminCompatibility({
  isDark,
  textColor,
  cardBg,
  borderColor,
}: AdminCompatibilityProps) {
  // Données de compatibilité basées sur ton app
  const [compatibilityData, setCompatibilityData] = useState({
    romance: {
      title: "Romance",
      compatibility: 85,
      description:
        "Strong romantic connection with deep emotional understanding.",
    },
    business: {
      title: "Business",
      compatibility: 72,
      description: "Good business partnership with complementary skills.",
    },
    magnetism: {
      title: "Magnetism",
      compatibility: 90,
      description: "Incredible magnetic attraction and chemistry.",
    },
    friendship: {
      title: "Friendship",
      compatibility: 78,
      description: "Solid friendship based on mutual respect and fun.",
    },
  });

  const handleUpdateCompatibility = (
    type: string,
    field: string,
    value: string | number
  ) => {
    setCompatibilityData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSaveCompatibility = () => {
    console.log("Saving compatibility data:", compatibilityData);
    alert("Compatibility settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${textColor}`}>
        Compatibility Management
      </h2>

      {/* Compatibility Scores Editor */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Compatibility Scores & Descriptions
        </h3>

        <div className="space-y-6">
          {Object.entries(compatibilityData).map(([key, data]) => (
            <div
              key={key}
              className={`p-4 rounded border ${borderColor} ${
                isDark ? "bg-gray-800/50" : "bg-gray-50"
              }`}
            >
              <h4
                className={`text-md font-semibold mb-3 ${textColor} capitalize`}
              >
                {data.title}
              </h4>

              <div className="mb-3">
                <label className={`block text-sm mb-1 ${textColor}`}>
                  Score (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.compatibility}
                  onChange={(e) =>
                    handleUpdateCompatibility(
                      key,
                      "compatibility",
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-full p-2 rounded border ${
                    isDark
                      ? "bg-[#281109] border-[#F2EAE0]/30"
                      : "bg-white border-gray-300"
                  } ${textColor}`}
                />
              </div>

              <div>
                <label className={`block text-sm mb-1 ${textColor}`}>
                  Description
                </label>
                <textarea
                  value={data.description}
                  onChange={(e) =>
                    handleUpdateCompatibility(
                      key,
                      "description",
                      e.target.value
                    )
                  }
                  className={`w-full p-2 rounded border h-20 resize-none ${
                    isDark
                      ? "bg-[#281109] border-[#F2EAE0]/30"
                      : "bg-white border-gray-300"
                  } ${textColor}`}
                  placeholder="Enter compatibility description..."
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveCompatibility}
          className={`mt-6 px-4 py-2 bg-[#BFB0A7] text-[#281109] rounded hover:opacity-80 transition flex items-center gap-2`}
        >
          <FiSave size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
