"use client";

import { FiExternalLink, FiDatabase } from "react-icons/fi";

interface AdminChartProps {
  isDark: boolean;
  textColor: string;
  cardBg: string;
  borderColor: string;
}

export default function AdminChart({
  isDark,
  textColor,
  cardBg,
  borderColor,
}: AdminChartProps) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${textColor}`}>
        Birth Chart Management
      </h2>

      {/* Free Astrology API */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Chart Generation API
        </h3>

        <div
          className={`p-4 rounded border-l-4 border-[#BFB0A7] ${
            isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`${textColor} font-medium`}>
              Free Astrology API
            </span>
            <span className="text-green-500 text-sm font-semibold">
              ✓ Active
            </span>
          </div>
          <p className={`text-sm ${textColor} opacity-70 mb-3`}>
            Charts generated automatically during user registration
          </p>
          <div className="flex gap-2">
            <a
              href="https://freeastrologyapi.com/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-sm rounded flex items-center gap-2 transition ${
                isDark
                  ? "bg-blue-700 hover:bg-blue-600"
                  : "bg-blue-100 hover:bg-blue-200"
              } text-blue-600 hover:text-blue-700`}
            >
              <FiExternalLink size={16} />
              View API Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Supabase Storage */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Planet Descriptions Storage
        </h3>

        <div
          className={`p-4 rounded border-l-4 border-[#BFB0A7] ${
            isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`${textColor} font-medium`}>Supabase Storage</span>
            <span className="text-blue-500 text-sm font-semibold">
              ✓ Connected
            </span>
          </div>
          <p className={`text-sm ${textColor} opacity-70 mb-3`}>
            Planet interpretation texts stored as JSON files
          </p>
          <div className="flex gap-2">
            <a
              href="https://supabase.com/dashboard/project/vaajrvpkjbzyqbxiuzsi/storage/buckets/charts"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-sm rounded flex items-center gap-2 transition ${
                isDark
                  ? "bg-green-700 hover:bg-green-600"
                  : "bg-green-100 hover:bg-green-200"
              } text-green-600 hover:text-green-700`}
            >
              <FiDatabase size={16} />
              Edit JSON Files
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
