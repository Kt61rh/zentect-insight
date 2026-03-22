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

    // finishReason が長さ制限の場合はエラーにする
    const finishReason = result.response.candidates?.[0]?.finishReason;
    if (finishReason === "MAX_TOKENS") {
      console.error("Gemini response truncated (MAX_TOKENS)");
      return NextResponse.json(
        { error: "生成された記事が長すぎました。文字数を短くして再度お試しください。" },
        { status: 500 }
      );
    }

    let article: GenerationOutput;
    try {
      article = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parse failed. Raw response length:", text.length);
      console.error("Raw response (first 500 chars):", text.substring(0, 500));
      console.error("finishReason:", finishReason);
      throw new Error("AIの応答をJSONとして解析できませんでした。再度お試しください。");
    }

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
