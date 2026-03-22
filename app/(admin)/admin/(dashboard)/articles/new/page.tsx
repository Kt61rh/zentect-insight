import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-black">新規記事作成</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <ArticleForm />
      </div>
    </div>
  );
}
