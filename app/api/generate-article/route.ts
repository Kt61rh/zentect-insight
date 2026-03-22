import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getGeminiModel } from "@/lib/gemini";
import {
  buildArticlePrompt,
  type GenerationInput,
  type GenerationOutput,
} from "@/lib/prompts";

export async function POST(request: NextRequest) {
  // 認証チェック
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const input: GenerationInput = await request.json();
    const prompt = buildArticlePrompt(input);
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const article: GenerationOutput = JSON.parse(text);

    return NextResponse.json(article);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Generation error:", message, error);
    return NextResponse.json(
      { error: `記事の生成に失敗しました: ${message}` },
      { status: 500 }
    );
  }
}
