"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { User } from "@supabase/supabase-js";

import { IoMoon, IoStar, IoPlanet, IoHeart, IoPerson } from "react-icons/io5";

import AdminHome from "./components/AdminHome";
import AdminChart from "./components/AdminChart";
import AdminCompatibility from "./components/AdminCompatibility";
import AdminUsers from "./components/AdminUsers";
import AdminExplore from "./components/AdminExplore";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState("home");
  const [language, setLanguage] = useState<"en" | "fr">("en");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#281109]" : "bg-[#f2eae0]";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";
  const cardBg = isDark ? "bg-[#3D2918]" : "bg-white";
  const borderColor = isDark ? "border-[#F2EAE0]/20" : "border-[#7b635a]/20";

  // Vérification de l'auth au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier la session locale
        const adminSession = localStorage.getItem("admin_session");
        if (!adminSession) {
          router.push("/admin/auth");
          return;
        }

        const sessionData = JSON.parse(adminSession);

        // Vérifier si la session n'est pas expirée
        if (
          sessionData.expires &&
          new Date(sessionData.expires * 1000) < new Date()
        ) {
          localStorage.removeItem("admin_session");
          router.push("/admin/auth");
          return;
        }

        // Vérifier avec Supabase que l'utilisateur est toujours admin
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser(sessionData.token);

        if (error || !user || user.app_metadata?.role !== "admin") {
          localStorage.removeItem("admin_session");
          router.push("/admin/auth");
          return;
        }

        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("admin_session");
        router.push("/admin/auth");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("admin_session");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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

  if (loading) {
    return (
      <div
        className={`min-h-screen ${bgColor} flex items-center justify-center`}
      >
        <div className={`text-center ${textColor}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto mb-4"></div>
          <p>Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${bgColor}`}>
      {/* Header */}
      <header className={`border-b ${borderColor} ${cardBg}`}>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <h1 className={`text-2xl font-bold ${textColor}`}>
              My AstroMood Admin -
            </h1>
            {user && (
              <h1 className={`text-2xl ${textColor} opacity-70`}>
                Hi {user.user_metadata.username} !
              </h1>
            )}
          </div>

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

            <button
              onClick={handleLogout}
              className={`px-3 py-1 border rounded ${borderColor} ${textColor} hover:opacity-80 transition `}
            >
              Logout
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
