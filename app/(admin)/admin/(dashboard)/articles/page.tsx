import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { formatDate } from "@/lib/utils";
import { ArticleActions } from "@/components/admin/ArticleActions";

export default async function ArticleListPage() {
  const articles = await getAllArticles();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-black">記事一覧</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/generate"
            className="rounded-md border border-brand-teal px-4 py-2 text-sm font-medium text-brand-teal transition-colors hover:bg-brand-teal/5"
          >
            AI生成
          </Link>
          <Link
            href="/admin/articles/new"
            className="rounded-md bg-brand-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-teal/90"
          >
            新規作成
          </Link>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">
          <p className="text-gray-500">記事がまだありません</p>
          <Link
            href="/admin/articles/new"
            className="mt-4 inline-block text-sm text-brand-teal hover:underline"
          >
            最初の記事を作成する
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-500">
                <th className="px-4 py-3 font-medium">タイトル</th>
                <th className="px-4 py-3 font-medium">カテゴリ</th>
                <th className="px-4 py-3 font-medium">ステータス</th>
                <th className="px-4 py-3 font-medium">更新日</th>
                <th className="px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="text-sm font-medium text-brand-black hover:text-brand-teal"
                    >
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {article.category}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        article.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {article.status === "published" ? "公開" : "下書き"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {formatDate(article.updated_at)}
                  </td>
                  <td className="px-4 py-3">
                    <ArticleActions
                      id={article.id}
                      status={article.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
