"use client";

import { useState, useEffect } from "react";
import {
  FiUsers,
  FiShield,
  FiUser,
  FiSearch,
  FiMoreVertical,
  FiRefreshCw,
} from "react-icons/fi";

interface AdminUserManagementProps {
  isDark: boolean;
  textColor: string;
  cardBg: string;
  borderColor: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  sign: string;
  createdAt: string;
  gender: string;
  birthplace: string;
}

export default function AdminUsers({
  isDark,
  textColor,
  cardBg,
  borderColor,
}: AdminUserManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRoleActions, setShowRoleActions] = useState<string | null>(null);

  // Stats calculées depuis les vraies données
  const userStats = {
    totalUsers: users.length,
    adminUsers: users.filter((user) => user.role === "admin").length,
    newUsersToday: users.filter((user) => {
      const today = new Date().toISOString().split("T")[0];
      return user.createdAt.startsWith(today);
    }).length,
    topSign: getTopSign(users),
  };

  function getTopSign(userList: User[]) {
    const signCounts = userList.reduce((acc, user) => {
      acc[user.sign] = (acc[user.sign] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      Object.entries(signCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "Cancer"
    );
  }

  function getZodiacSign(dateOfBirth: string): string {
    if (!dateOfBirth) return "Cancer";

    const date = new Date(dateOfBirth);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Logique pour déterminer le signe zodiacal
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
      return "Pisces";

    return "Cancer";
  }

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      // Transformer les données Supabase en format utilisable
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformedUsers: User[] = data.users.map((user: any) => ({
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username || "Unknown",
        role: user.app_metadata?.role || "user",
        sign: getZodiacSign(user.user_metadata?.dateOfBirth),
        createdAt: user.created_at?.split("T")[0] || "",
        gender: user.user_metadata?.gender || "Unknown",
        birthplace: user.user_metadata?.birthplace || "Unknown",
      }));

      setUsers(transformedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please check your API configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      const response = await fetch("/api/admin/update-user-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          role: newRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      // Mettre à jour localement
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, role: newRole as "admin" | "user" }
            : user
        )
      );

      alert(`User role updated to ${newRole} successfully!`);
    } catch (error) {
      console.error("Error updating user role:", error);
      alert(`Failed to update user role. Error: ${error}`);
    }

    setShowRoleActions(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSignImage = (sign: string) => {
    const theme = isDark ? "dark" : "light";
    return `https://vaajrvpkjbzyqbxiuzsi.supabase.co/storage/v1/object/public/assets/signs/${sign.toLowerCase()}_${theme}.png`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className={`text-2xl font-bold ${textColor}`}>User Management</h2>
        <div
          className={`p-6 rounded-lg ${cardBg} border ${borderColor} text-center`}
        >
          <FiRefreshCw
            className={`animate-spin mx-auto mb-2 ${textColor}`}
            size={24}
          />
          <p className={textColor}>Loading users from Supabase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${textColor}`}>User Management</h2>

      {/* Statistics Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`p-2 rounded ${
                isDark ? "bg-orange-900/20" : "bg-orange-50"
              }`}
            >
              <FiUsers className="text-[#BFB0A7]" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#BFB0A7]">
                {userStats.totalUsers.toLocaleString()}
              </div>
              <div className={`text-sm ${textColor}`}>Total Users</div>
            </div>
          </div>
          <div className={`text-xs ${textColor} opacity-70`}>
            +{userStats.newUsersToday} today
          </div>
        </div>

        <div className={`p-4 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`p-2 rounded ${
                isDark ? "bg-orange-900/20" : "bg-orange-50"
              }`}
            >
              <FiShield className="text-[#BFB0A7]" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#BFB0A7]">
                {userStats.adminUsers}
              </div>
              <div className={`text-sm ${textColor}`}>Admin Users</div>
            </div>
          </div>
          <div className={`text-xs ${textColor} opacity-70`}>
            Most popular: {userStats.topSign}
          </div>
        </div>
      </div>

      {/* User List */}
      <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${textColor}`}>
            User Directory
          </h3>

          <div className="flex items-center gap-4">
            {/* Refresh Button */}
            <button
              onClick={fetchUsers}
              disabled={loading}
              className={`p-2 rounded hover:opacity-70 transition ${textColor}`}
              title="Refresh users"
            >
              <FiRefreshCw
                className={loading ? "animate-spin" : ""}
                size={16}
              />
            </button>

            {/* Search */}
            <div className="relative">
              <FiSearch
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textColor} opacity-50`}
                size={16}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded border ${
                  isDark
                    ? "bg-[#281109] border-[#F2EAE0]/30"
                    : "bg-white border-gray-300"
                } ${textColor} text-sm`}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 rounded border ${borderColor} ${
                isDark ? "bg-gray-800/30" : "bg-gray-50"
              } hover:opacity-80 transition`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar with zodiac sign */}
                  <div>
                    <img
                      src={getSignImage(user.sign)}
                      alt={user.sign}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>

                  {/* User Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${textColor}`}>
                        {user.username}
                      </span>
                      {user.role === "admin" && (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDark ? "bg-orange-900/30" : "bg-orange-100"
                          } text-[#BFB0A7] font-medium`}
                        >
                          Admin
                        </span>
                      )}
                    </div>
                    <div className={`text-sm ${textColor} opacity-70`}>
                      {user.email} • {user.sign}
                    </div>
                    <div className={`text-xs ${textColor} opacity-50`}>
                      Joined {user.createdAt}
                    </div>
                  </div>
                </div>

                {/* Role Management */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowRoleActions(
                        showRoleActions === user.id ? null : user.id
                      )
                    }
                    className={`p-2 rounded hover:opacity-70 transition ${textColor}`}
                  >
                    <FiMoreVertical size={16} />
                  </button>

                  {showRoleActions === user.id && (
                    <div
                      className={`absolute right-0 top-10 z-10 ${cardBg} border ${borderColor} rounded shadow-lg p-2 w-40`}
                    >
                      <button
                        onClick={() => handleRoleToggle(user.id, user.role)}
                        className={`w-full text-left px-3 py-2 text-sm rounded hover:opacity-70 transition ${textColor} flex items-center gap-2`}
                      >
                        {user.role === "admin" ? (
                          <>
                            <FiUser size={14} />
                            Make User
                          </>
                        ) : (
                          <>
                            <FiShield size={14} />
                            Make Admin
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && searchTerm && (
          <div className={`text-center py-8 ${textColor} opacity-70`}>
            No users found matching &quot;{searchTerm}&quot;
          </div>
        )}

        {users.length === 0 && !loading && (
          <div className={`text-center py-8 ${textColor} opacity-70`}>
            No users found. Create some accounts in your mobile app first!
          </div>
        )}
      </div>
    </div>
  );
}
