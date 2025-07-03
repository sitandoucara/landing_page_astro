"use client";

import { FiBook, FiImage } from "react-icons/fi";

interface AdminExploreProps {
  isDark: boolean;
  textColor: string;
  cardBg: string;
  borderColor: string;
}

export default function AdminExplore({
  isDark,
  textColor,
  cardBg,
  borderColor,
}: AdminExploreProps) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${textColor}`}>
        Explore Content Management
      </h2>

      {/* Learning Content */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Learning Content
        </h3>

        <div
          className={`p-4 rounded border-l-4 border-[#BFB0A7] ${
            isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`${textColor} font-medium`}>
              Lesson Management
            </span>
            <span className={`text-sm font-semibold ${textColor}`}>
              ✓ Developer Managed
            </span>
          </div>
          <p className={`text-sm ${textColor} opacity-70 mb-3`}>
            JSON content and audio files synchronized by development team
          </p>
          <div className="flex gap-2">
            <a
              href="https://supabase.com/dashboard/project/vaajrvpkjbzyqbxiuzsi/storage/buckets/signdetails"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-sm rounded flex items-center gap-2 transition ${
                isDark
                  ? "bg-[#F2EAE0] hover:bg-[#584540]/40"
                  : "bg-[#7B635A] hover:bg-[#584540]/30"
              } text-[#BFB0A7] hover:opacity-80`}
            >
              <FiBook size={16} />
              Manage Lessons
            </a>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div
            className={`p-3 rounded text-center ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
            }`}
          >
            <div className="text-2xl font-bold text-[#BFB0A7]">10</div>
            <div className={`text-sm ${textColor}`}>Total Lessons</div>
          </div>
          <div
            className={`p-3 rounded text-center ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
            }`}
          >
            <div className="text-2xl font-bold text-[#BFB0A7]">3</div>
            <div className={`text-sm ${textColor}`}>Available</div>
          </div>
          <div
            className={`p-3 rounded text-center ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
            }`}
          >
            <div className="text-2xl font-bold text-[#BFB0A7]">2</div>
            <div className={`text-sm ${textColor}`}>Voices</div>
          </div>
        </div>
      </div>

      {/* Quiz & Games */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          Quiz & Games
        </h3>

        <div
          className={`p-4 rounded border-l-4 border-[#BFB0A7] ${
            isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`${textColor} font-medium`}>Game Development</span>
            <span className={`text-sm font-semibold ${textColor}`}>
              ✓ Code Managed
            </span>
          </div>
          <p className={`text-sm ${textColor} opacity-70 mb-3`}>
            Game logic and questions hardcoded by development team
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div
            className={`p-3 rounded text-center ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
            }`}
          >
            <div className="text-2xl font-bold text-[#BFB0A7]">2</div>
            <div className={`text-sm ${textColor}`}>Active Games</div>
          </div>
          <div
            className={`p-3 rounded text-center ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
            }`}
          >
            <div className="text-2xl font-bold text-[#BFB0A7]">8</div>
            <div className={`text-sm ${textColor}`}>Guess Who Questions</div>
          </div>
          <div
            className={`p-3 rounded text-center ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
            }`}
          >
            <div className="text-2xl font-bold text-[#BFB0A7]">10</div>
            <div className={`text-sm ${textColor}`}>True/False Questions</div>
          </div>
        </div>
      </div>

      {/* AR Filters */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
          AR Filters Management
        </h3>

        <div
          className={`p-4 rounded border-l-4 border-[#BFB0A7] ${
            isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`${textColor} font-medium`}>
              Filter Assets Storage
            </span>
            <span className={`text-sm font-semibold ${textColor}`}>
              ✓ Connected
            </span>
          </div>
          <p className={`text-sm ${textColor} opacity-70 mb-3`}>
            Filter icons and assets managed in Supabase storage
          </p>
          <div className="flex gap-2">
            <a
              href="https://supabase.com/dashboard/project/vaajrvpkjbzyqbxiuzsi/storage/buckets/assets"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-sm rounded flex items-center gap-2 transition ${
                isDark
                  ? "bg-[#F2EAE0] hover:bg-[#584540]/40"
                  : "bg-[#7B635A] hover:bg-[#584540]/30"
              } text-[#BFB0A7] hover:opacity-80`}
            >
              <FiImage size={16} />
              Manage Assets
            </a>
          </div>
        </div>

        {/* Filter Links Management */}
        <div className="mt-4 space-y-3">
          <div
            className={`p-3 rounded border ${borderColor} ${
              isDark ? "bg-[#584540]/10" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${textColor} font-medium`}>
                Filter Link 1
              </span>
              <button
                className={`text-xs px-2 py-1 rounded ${
                  isDark ? "bg-[#584540]/30" : "bg-[#584540]/20"
                } text-[#BFB0A7]`}
              >
                Edit
              </button>
            </div>
            <input
              type="text"
              value="https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=a12e28db4cc548d3b1ee58301811974f"
              className={`w-full p-2 text-xs rounded border ${
                isDark
                  ? "bg-[#281109] border-[#F2EAE0]/30"
                  : "bg-[#F2EAE0] border-[#7B635A]/30"
              } ${textColor}`}
              readOnly
            />
          </div>

          <div
            className={`p-3 rounded border ${borderColor} ${
              isDark ? "bg-[#584540]/10" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${textColor} font-medium`}>
                Filter Link 2
              </span>
              <button
                className={`text-xs px-2 py-1 rounded ${
                  isDark ? "bg-[#584540]/30" : "bg-[#584540]/20"
                } text-[#BFB0A7]`}
              >
                Edit
              </button>
            </div>
            <input
              type="text"
              value="https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=d6c70fbbed2f4448bfd12b94b718eb8e"
              className={`w-full p-2 text-xs rounded border ${
                isDark
                  ? "bg-[#281109] border-[#F2EAE0]/30"
                  : "bg-[#F2EAE0] border-[#7B635A]/30"
              } ${textColor}`}
              readOnly
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div
            className={`p-3 rounded text-center ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
            }`}
          >
            <div className="text-2xl font-bold text-[#BFB0A7]">3</div>
            <div className={`text-sm ${textColor}`}>Total Filters</div>
          </div>
          <div
            className={`p-3 rounded text-center ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
            }`}
          >
            <div className="text-2xl font-bold text-[#BFB0A7]">2</div>
            <div className={`text-sm ${textColor}`}>Active</div>
          </div>
          <div
            className={`p-3 rounded text-center ${
              isDark ? "bg-[#584540]/20" : "bg-[#584540]/10"
            }`}
          >
            <div className="text-2xl font-bold text-[#BFB0A7]">1</div>
            <div className={`text-sm ${textColor}`}>Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}
