"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { FiEye, FiEyeOff, FiShield } from "react-icons/fi";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminAuthPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#281109]" : "bg-[#f2eae0]";
  const textColor = isDark ? "text-[#F2EAE0]" : "text-[#7b635a]";
  const cardBg = isDark ? "bg-[#3D2918]" : "bg-white";
  const borderColor = isDark ? "border-[#F2EAE0]/20" : "border-[#7b635a]/20";

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Connexion à Supabase
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Authentication failed");
        setLoading(false);
        return;
      }

      // 2. Vérifier le rôle admin
      const userRole = data.user.app_metadata?.role || "user";

      if (userRole !== "admin") {
        setError("Access denied. Admin privileges required.");
        // Déconnexion immédiate si pas admin
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // 3. Si admin : stocker la session et rediriger
      localStorage.setItem(
        "admin_session",
        JSON.stringify({
          user: data.user,
          token: data.session.access_token,
          expires: data.session.expires_at,
        })
      );

      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${bgColor} flex items-center justify-center p-8`}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-6 right-6 p-3 rounded-full ${cardBg} border ${borderColor} hover:opacity-80 transition`}
      >
        {theme === "light" ? (
          <PiMoonStarsFill className={`text-2xl ${textColor}`} />
        ) : (
          <PiSunDimFill className={`text-2xl ${textColor}`} />
        )}
      </button>

      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-full bg-[#BFB0A7] flex items-center justify-center`}
          >
            <FiShield className="text-2xl text-[#281109]" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${textColor}`}>
            Admin Access Only!
          </h1>
        </div>

        {/* Login Form */}
        <div className={`p-8 rounded-2xl ${cardBg} border ${borderColor}`}>
          {error && (
            <div
              className={`mb-6 p-4 rounded-lg border-2 border-red-500 bg-red-50 ${
                isDark ? "bg-red-900/20" : ""
              }`}
            >
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full p-3 rounded-lg border ${
                  isDark
                    ? "bg-[#281109] border-[#F2EAE0]/30"
                    : "bg-white border-gray-300"
                } ${textColor} focus:ring-2 focus:ring-[#BFB0A7] focus:border-transparent transition`}
                placeholder="admin@astromood.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full p-3 pr-12 rounded-lg border ${
                    isDark
                      ? "bg-[#281109] border-[#F2EAE0]/30"
                      : "bg-white border-gray-300"
                  } ${textColor} focus:ring-2 focus:ring-[#BFB0A7] focus:border-transparent transition`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${textColor} opacity-70 hover:opacity-100 transition`}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className={`w-full p-4 rounded-lg bg-[#BFB0A7] text-[#281109] font-semibold hover:opacity-90 transition ${
                loading || !email || !password
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/")}
            className={`${textColor} opacity-70 hover:opacity-100 transition text-sm`}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
