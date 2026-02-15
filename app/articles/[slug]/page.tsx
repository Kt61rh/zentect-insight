import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, articles } from "@/src/constants/mockData";
import { ArticleCtaCard } from "@/components/ArticleCtaCard";
import type { BodyBlock } from "@/src/constants/mockData";

function ArticleBody({ body }: { body: BodyBlock[] }) {
  return (
    <div className="space-y-6">
      {body.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="border-l-4 border-brand-teal pl-4 text-xl font-bold text-brand-black"
            >
              {block.content}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={index}
              className="border-l-4 border-brand-teal pl-4 text-lg font-semibold text-brand-black"
            >
              {block.content}
            </h3>
          );
        }
        return (
          <p key={index} className="mb-4 text-[#333333] leading-relaxed">
            {block.content}
          </p>
        );
      })}
    </div>
  );
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-brand-teal hover:underline"
        >
          ← 一覧に戻る
        </Link>

        <header className="mb-8">
          <span className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-medium text-brand-teal bg-brand-teal/10">
            {article.category}
          </span>
          <h1 className="mb-2 text-2xl font-bold text-brand-black md:text-3xl">
            {article.title}
          </h1>
          <time className="text-sm text-gray-500">{article.date}</time>
        </header>

        <div className="relative mb-8 aspect-video w-full overflow-hidden bg-gray-100">
          <Image
            src={article.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            unoptimized
          />
        </div>

        <div className="mb-12">
          <ArticleBody body={article.body} />
        </div>

        <ArticleCtaCard />
      </div>
    </article>
  );
}
