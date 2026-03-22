"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  togglePublishArticle,
  deleteArticle,
} from "@/app/(admin)/admin/(dashboard)/articles/actions";

export function ArticleActions({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  async function handleTogglePublish() {
    setLoading(true);
    await togglePublishArticle(id, status);
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    await deleteArticle(id);
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/articles/${id}/edit`}
        className="text-sm text-brand-teal hover:underline"
      >
        編集
      </Link>
      <button
        onClick={handleTogglePublish}
        disabled={loading}
        className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        {status === "published" ? "非公開" : "公開"}
      </button>
      {showConfirm ? (
        <span className="flex items-center gap-1">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-sm text-red-600 hover:underline disabled:opacity-50"
          >
            確定
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            取消
          </button>
        </span>
      ) : (
        <button
          onClick={() => setShowConfirm(true)}
          className="text-sm text-red-400 hover:text-red-600"
        >
          削除
        </button>
      )}
    </div>
  );
}
