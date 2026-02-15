import Image from "next/image";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/src/constants/mockData";

export default function Home() {
  return (
    <>
      {/* Section 1: Hero Area */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-brand-black md:text-4xl lg:text-5xl">
                当たり前を疑い、再構築する
              </h1>
              <p className="text-lg text-gray-600">
                zentect Insight は、B2Bセールスとビジネス変革に役立つ知見を発信するメディアです。
              </p>
            </div>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src="/hero-placeholder.svg"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Article Grid */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
