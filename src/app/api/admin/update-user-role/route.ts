import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Configuration Supabase Admin
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const { userId, role } = await request.json();

    // Validation
    if (!userId || !role) {
      return NextResponse.json(
        { error: "userId and role are required" },
        { status: 400 }
      );
    }

    if (!["admin", "user"].includes(role)) {
      return NextResponse.json(
        { error: 'Role must be either "admin" or "user"' },
        { status: 400 }
      );
    }

    // Mettre à jour le rôle de l'utilisateur
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      {
        app_metadata: {
          role: role,
        },
      }
    );

    if (error) {
      console.error("Error updating user role:", error);
      return NextResponse.json(
        { error: "Failed to update user role" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      message: `User role updated to ${role}`,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
