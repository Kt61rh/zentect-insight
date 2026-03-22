import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-black">記事を編集</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <ArticleForm article={article} />
      </div>
    </div>
  );
}
