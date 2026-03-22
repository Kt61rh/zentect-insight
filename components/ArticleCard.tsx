import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  image: string;
};

export function ArticleCard({
  slug,
  title,
  category,
  summary,
  date,
  image,
}: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="block border border-gray-200 bg-white transition-colors duration-100 hover:bg-gray-50"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="p-4">
        <span className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-medium text-brand-teal bg-brand-teal/10">
          {category}
        </span>
        <h3 className="mb-2 font-bold text-brand-black">{title}</h3>
        <p className="mb-3 line-clamp-3 text-sm text-gray-600">{summary}</p>
        <time className="text-sm text-gray-500">{date}</time>
      </div>
    </Link>
  );
}
