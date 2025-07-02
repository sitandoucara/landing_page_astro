import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

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

// GET - Récupérer toutes les affirmations
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const language = url.searchParams.get("language") || "en";

    const { data, error } = await supabaseAdmin
      .from("affirmations")
      .select("*")
      .eq("language", language)
      .order("type");

    if (error) {
      console.error("Error fetching affirmations:", error);
      return NextResponse.json(
        { error: "Failed to fetch affirmations" },
        { status: 500 }
      );
    }

    // Transformer en format plus pratique
    const affirmationsMap = data.reduce((acc, affirmation) => {
      acc[affirmation.type] = affirmation.text;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({
      affirmations: affirmationsMap,
      raw: data,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Mettre à jour les affirmations
export async function POST(request: NextRequest) {
  try {
    const { affirmations, language = "en" } = await request.json();

    if (!affirmations || typeof affirmations !== "object") {
      return NextResponse.json(
        { error: "Invalid affirmations data" },
        { status: 400 }
      );
    }

    const updates = [];
    const errors = [];

    // Mettre à jour chaque affirmation
    for (const [type, text] of Object.entries(affirmations)) {
      if (typeof text === "string" && text.trim()) {
        try {
          // Essayer d'abord un UPDATE
          const { data: existingData, error: selectError } = await supabaseAdmin
            .from("affirmations")
            .select("id")
            .eq("type", type)
            .eq("language", language)
            .single();

          if (selectError && selectError.code !== "PGRST116") {
            // PGRST116 = no rows found
            throw selectError;
          }

          let result;
          if (existingData) {
            // UPDATE existant
            result = await supabaseAdmin
              .from("affirmations")
              .update({
                text: text.trim(),
                updated_at: new Date().toISOString(),
              })
              .eq("type", type)
              .eq("language", language);
          } else {
            // INSERT nouveau
            result = await supabaseAdmin.from("affirmations").insert({
              type,
              text: text.trim(),
              language,
              updated_at: new Date().toISOString(),
            });
          }

          if (result.error) {
            console.error(`Error updating ${type}:`, result.error);
            errors.push(`${type}: ${result.error.message}`);
          } else {
            updates.push(type);
          }
        } catch (err) {
          console.error(`Error processing ${type}:`, err);
          errors.push(
            `${type}: ${err instanceof Error ? err.message : "Unknown error"}`
          );
        }
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: "Some affirmations failed to update",
          details: errors,
          updated: updates,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updates.length} affirmations`,
      updated: updates,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
