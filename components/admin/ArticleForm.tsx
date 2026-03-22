"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Article, BodyBlock, ArticleInsert } from "@/lib/types";
import { generateSlug } from "@/lib/utils";
import { BodyEditor } from "@/components/admin/BodyEditor";
import {
  createArticle,
  updateArticle,
} from "@/app/(admin)/admin/(dashboard)/articles/actions";

type Props = {
  article?: Article;
};

export function ArticleForm({ article }: Props) {
  const isEdit = !!article?.id;
  const router = useRouter();

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [category, setCategory] = useState(article?.category ?? "");
  const [summary, setSummary] = useState(article?.summary ?? "");
  const [metaDescription, setMetaDescription] = useState(
    article?.meta_description ?? ""
  );
  const [imageUrl, setImageUrl] = useState(article?.image_url ?? "");
  const [body, setBody] = useState<BodyBlock[]>(
    article?.body ?? [{ type: "p", content: "" }]
  );
  const [status, setStatus] = useState(article?.status ?? "draft");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const data: ArticleInsert = {
      title,
      slug,
      category,
      summary,
      meta_description: metaDescription,
      image_url: imageUrl,
      body,
      status,
      published_at:
        status === "published"
          ? article?.published_at ?? new Date().toISOString()
          : article?.published_at ?? null,
      author_id: article?.author_id ?? null,
    };

    try {
      if (isEdit) {
        await updateArticle(article.id, data);
        router.refresh();
      } else {
        await createArticle(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* タイトル */}
        <div className="lg:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            タイトル
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          />
        </div>

        {/* スラッグ */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            スラッグ（URL）
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
              placeholder="article-slug-here"
            />
            <button
              type="button"
              onClick={() => setSlug(generateSlug(title))}
              className="whitespace-nowrap rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              自動生成
            </button>
          </div>
        </div>

        {/* カテゴリ */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            カテゴリ
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
            placeholder="DX, AI経営, セールス..."
          />
        </div>

        {/* サマリー */}
        <div className="lg:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            サマリー
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
          />
        </div>

        {/* メタディスクリプション */}
        <div className="lg:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            メタディスクリプション（SEO）
            <span className="ml-2 text-xs text-gray-400">
              {metaDescription.length}/160
            </span>
          </label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
            placeholder="検索結果に表示される説明文（120〜160文字推奨）"
          />
        </div>

        {/* アイキャッチ画像URL */}
        <div className="lg:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            アイキャッチ画像URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* 本文エディタ */}
      <BodyEditor blocks={body} onChange={setBody} />

      {/* ステータス & 保存 */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={status === "draft"}
              onChange={() => setStatus("draft")}
            />
            下書き
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="status"
              value="published"
              checked={status === "published"}
              onChange={() => setStatus("published")}
            />
            公開
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-brand-teal px-6 py-2 font-medium text-white transition-colors hover:bg-brand-teal/90 disabled:opacity-50"
        >
          {saving ? "保存中..." : isEdit ? "更新する" : "作成する"}
        </button>
      </div>
    </form>
  );
}
