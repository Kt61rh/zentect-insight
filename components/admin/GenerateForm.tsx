"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BodyBlock } from "@/lib/types";
import type { GenerationOutput } from "@/lib/prompts";
import { ArticleForm } from "@/components/admin/ArticleForm";

type Step = "input" | "preview";

export function GenerateForm() {
  const [step, setStep] = useState<Step>("input");
  const [keywords, setKeywords] = useState("");
  const [theme, setTheme] = useState("");
  const [sourceUrls, setSourceUrls] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [targetLength, setTargetLength] = useState<"short" | "medium" | "long">(
    "medium"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState<GenerationOutput | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keywords: keywords
            .split(/[,、]/)
            .map((k) => k.trim())
            .filter(Boolean),
          theme,
          sourceUrls: sourceUrls
            .split("\n")
            .map((u) => u.trim())
            .filter(Boolean),
          sourceText: sourceText || undefined,
          targetLength,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "生成に失敗しました");
      }

      const article: GenerationOutput = await res.json();
      setGenerated(article);
      setStep("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  if (step === "preview" && generated) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-black">
            生成結果を確認・編集
          </h2>
          <button
            onClick={() => setStep("input")}
            className="text-sm text-brand-teal hover:underline"
          >
            ← 入力に戻る
          </button>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <ArticleForm
            article={{
              id: "",
              title: generated.title,
              slug: generated.slug,
              category: generated.category,
              summary: generated.summary,
              meta_description: generated.meta_description,
              body: generated.body,
              image_url: "",
              status: "draft",
              published_at: null,
              created_at: "",
              updated_at: "",
              author_id: null,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleGenerate} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* キーワード */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          キーワード
          <span className="ml-1 text-xs text-gray-400">
            カンマ区切りで複数入力可
          </span>
        </label>
        <input
          type="text"
          required
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          placeholder="例: B2Bセールス, AI, 営業DX"
        />
      </div>

      {/* テーマ */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          テーマ / トピック
        </label>
        <textarea
          required
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          placeholder="例: AIを活用したB2B営業プロセスの効率化について、経営者向けに解説する記事"
        />
      </div>

      {/* 参考URL */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          参考URL
          <span className="ml-1 text-xs text-gray-400">任意・1行に1URL</span>
        </label>
        <textarea
          value={sourceUrls}
          onChange={(e) => setSourceUrls(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          placeholder="https://example.com/reference-article"
        />
      </div>

      {/* 参考テキスト */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          参考テキスト
          <span className="ml-1 text-xs text-gray-400">任意</span>
        </label>
        <textarea
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          placeholder="記事作成の参考にしたいテキストがあれば貼り付けてください"
        />
      </div>

      {/* 文字数 */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          目標文字数
        </label>
        <div className="flex gap-4">
          {[
            { value: "short", label: "短め（800〜1000字）" },
            { value: "medium", label: "標準（1500〜2000字）" },
            { value: "long", label: "長め（2500〜3000字）" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="targetLength"
                value={opt.value}
                checked={targetLength === opt.value}
                onChange={() =>
                  setTargetLength(opt.value as "short" | "medium" | "long")
                }
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* 生成ボタン */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-brand-teal px-6 py-3 font-medium text-white transition-colors hover:bg-brand-teal/90 disabled:opacity-50"
      >
        {loading ? "AIが記事を生成中..." : "記事を生成する"}
      </button>
    </form>
  );
}
