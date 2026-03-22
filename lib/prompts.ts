import type { BodyBlock } from "@/lib/types";

export type GenerationInput = {
  keywords: string[];
  theme: string;
  sourceUrls?: string[];
  sourceText?: string;
  targetLength?: "short" | "medium" | "long";
};

export type GenerationOutput = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  meta_description: string;
  body: BodyBlock[];
};

export function buildArticlePrompt(input: GenerationInput): string {
  const lengthGuide = {
    short: "800〜1000文字程度（段落5〜7個）",
    medium: "1500〜2000文字程度（段落8〜12個）",
    long: "2500〜3000文字程度（段落12〜18個）",
  };
  const length = lengthGuide[input.targetLength || "medium"];

  return `あなたはB2Bセールス・ビジネス変革の専門ライターです。
以下の入力情報に基づいて、SEO・AIO（AI Overview）に最適化された日本語の専門記事を生成してください。

## 入力情報
- キーワード: ${input.keywords.join(", ")}
- テーマ/トピック: ${input.theme}
${input.sourceUrls?.length ? `- 参考URL: ${input.sourceUrls.join(", ")}` : ""}
${input.sourceText ? `- 参考テキスト:\n${input.sourceText}` : ""}
- 目標文字数: ${length}

## SEO/AIO最適化の要件
1. **タイトル**: キーワードを自然に含み、クリック率を高める。30〜40文字以内。
2. **見出し構成**: h2 を2〜4個、各h2の下にh3を0〜2個配置。見出しにキーワードや関連語を含める。
3. **本文**:
   - 各段落は具体的で情報密度が高いこと
   - エンティティ（企業名、技術名、概念名）を積極的に使用
   - 数値やデータを含む具体的な記述を心がける
   - 最初の段落で記事の結論・要点を提示する（AIO対応）
4. **メタディスクリプション**: 120〜160文字。キーワードを含み、記事の価値を明確に伝える。
5. **サマリー**: 記事の要約。80〜120文字。
6. **スラッグ**: 英語のURL-friendly文字列（ハイフン区切り、小文字）

## 出力JSON形式
以下のJSON形式で出力してください。bodyの各要素はtype("h2", "h3", "p")とcontent(string)を持ちます。

{
  "title": "記事タイトル",
  "slug": "article-slug-here",
  "category": "カテゴリ名",
  "summary": "記事のサマリー",
  "meta_description": "SEOメタディスクリプション",
  "body": [
    { "type": "p", "content": "冒頭の段落（結論・要点を提示）" },
    { "type": "h2", "content": "最初の大見出し" },
    { "type": "p", "content": "本文段落..." },
    { "type": "h3", "content": "小見出し" },
    { "type": "p", "content": "本文段落..." },
    { "type": "h2", "content": "次の大見出し" },
    { "type": "p", "content": "本文段落..." }
  ]
}

## トーン・スタイル
- zentect Insightのブランドトーン：知的で冷静、構造的な思考、本質に切り込む
- 「である」調で統一
- 冗長な表現を避け、密度の高い文章にする
- 読者は経営者・事業責任者・営業部門長を想定`;
}
