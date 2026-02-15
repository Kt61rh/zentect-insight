type ArticleCtaCardProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export function ArticleCtaCard({
  title = "B2Bセールス効率化ガイド",
  description = "AIO対応。営業プロセスを構造化し、データドリブンな意思決定を実現するための実践ガイドです。",
  buttonLabel = "資料をダウンロードする",
}: ArticleCtaCardProps) {
  return (
    <div className="border border-gray-200 bg-brand-teal/5 p-6">
      <h3 className="mb-2 text-lg font-bold text-brand-black">{title}</h3>
      <p className="mb-4 text-sm text-gray-600 leading-relaxed">{description}</p>
      <a
        href="#"
        className="inline-block rounded-md bg-brand-teal px-4 py-2 font-medium text-white transition-colors hover:bg-brand-teal/90"
      >
        {buttonLabel}
      </a>
    </div>
  );
}
