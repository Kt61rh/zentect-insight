import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brand-black">
        ダッシュボード
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/articles"
          className="rounded-lg border border-gray-200 bg-white p-6 transition-colors hover:bg-gray-50"
        >
          <h2 className="mb-2 text-lg font-semibold text-brand-black">
            記事管理
          </h2>
          <p className="text-sm text-gray-500">
            記事の作成・編集・公開管理を行います
          </p>
        </Link>

        <Link
          href="/admin/generate"
          className="rounded-lg border border-gray-200 bg-white p-6 transition-colors hover:bg-gray-50"
        >
          <h2 className="mb-2 text-lg font-semibold text-brand-black">
            AI記事生成
          </h2>
          <p className="text-sm text-gray-500">
            キーワードとテーマからAIが記事を自動生成します
          </p>
        </Link>
      </div>
    </div>
  );
}
