import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedArticleBySlug } from "@/lib/articles";
import { ArticleCtaCard } from "@/components/ArticleCtaCard";
import type { BodyBlock } from "@/lib/types";

export const revalidate = 60;

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
        if (block.type === "image" && block.content) {
          return (
            <figure key={index} className="my-6">
              <Image
                src={block.content}
                alt={block.alt ?? ""}
                width={800}
                height={450}
                className="w-full rounded-md"
              />
              {block.alt && (
                <figcaption className="mt-2 text-center text-xs text-gray-500">
                  {block.alt}
                </figcaption>
              )}
            </figure>
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) return {};

  return {
    title: `${article.title} | zentect Insight`,
    description: article.meta_description || article.summary,
    openGraph: {
      title: article.title,
      description: article.meta_description || article.summary,
      type: "article",
      publishedTime: article.published_at ?? undefined,
      siteName: "zentect Insight",
      locale: "ja_JP",
      images: article.image_url ? [{ url: article.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.meta_description || article.summary,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description || article.summary,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Organization",
      name: "zentect",
    },
    publisher: {
      "@type": "Organization",
      name: "zentect",
      logo: {
        "@type": "ImageObject",
        url: "https://zentect-insight.vercel.app/zentect-logo.svg",
      },
    },
    image: article.image_url || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <time className="text-sm text-gray-500">
              {article.published_at ?? article.created_at}
            </time>
          </header>

          {article.image_url && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden bg-gray-100">
              <Image
                src={article.image_url}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                unoptimized
              />
            </div>
          )}

          <div className="mb-12">
            <ArticleBody body={article.body} />
          </div>

          <ArticleCtaCard />
        </div>
      </article>
    </>
  );
}
