import { GenerateForm } from "@/components/admin/GenerateForm";

export default function GeneratePage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-brand-black">AI記事生成</h1>
      <p className="mb-6 text-sm text-gray-500">
        キーワードとテーマを入力すると、SEO/AIOに最適化された記事をAIが自動生成します
      </p>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <GenerateForm />
      </div>
    </div>
  );
}
