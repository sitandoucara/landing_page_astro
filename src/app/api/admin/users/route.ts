import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Supabase Admin Configuration
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

// Retrieve all users via the Admin API
export async function GET() {
  try {
    const {
      data: { users },
      error,
    } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });

    if (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    }

    const sanitizedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      user_metadata: {
        username: user.user_metadata?.username,
        dateOfBirth: user.user_metadata?.dateOfBirth,
        gender: user.user_metadata?.gender,
        birthplace: user.user_metadata?.birthplace,
      },
      app_metadata: {
        role: user.app_metadata?.role || "user",
      },
    }));

    return NextResponse.json({
      users: sanitizedUsers,
      total: users.length,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
