export type BodyBlock =
  | { type: "p"; content: string }
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "image"; content: string; alt?: string };

export type ArticleStatus = "draft" | "published";

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  meta_description: string;
  body: BodyBlock[];
  image_url: string;
  status: ArticleStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string | null;
};

export type ArticleInsert = Omit<Article, "id" | "created_at" | "updated_at">;
export type ArticleUpdate = Partial<ArticleInsert>;
