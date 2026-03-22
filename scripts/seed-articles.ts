import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

const EYECATCH_BASE = "https://placehold.co/600x400/E0F5EF/00AABA";

const articles = [
  {
    slug: "legacy-structural-debt",
    title: "レガシー産業における構造的負債の解消プロセス",
    category: "DX",
    summary:
      "レガシーシステムは経営の足枷である。構造的負債の可視化と段階的解消が必要だ。本稿では実践的なアプローチを論じる。",
    meta_description:
      "レガシー産業の構造的負債を可視化し、段階的に解消するための実践的アプローチを解説。DX推進における優先順位付けとリソース配分の設計方法を紹介します。",
    image_url: `${EYECATCH_BASE}?text=Zentect`,
    status: "published" as const,
    published_at: "2025-02-15T00:00:00Z",
    body: [
      { type: "p" as const, content: "レガシー産業において、構造的負債は経営の足枷となっている。本稿では、その可視化と段階的解消のための実践的アプローチを論じる。" },
      { type: "h2" as const, content: "構造的負債の本質" },
      { type: "p" as const, content: "構造的負債とは、技術的・組織的な累積的課題である。可視化されない負債は、意思決定を歪め、変革を阻害する。まずは現状の棚卸しが不可欠だ。" },
      { type: "h3" as const, content: "解消プロセスの設計" },
      { type: "p" as const, content: "段階的解消には、優先順位付けとリソース配分の設計が必要である。影響度と解消コストのマトリクスで判断し、計画的に進めることが重要だ。" },
      { type: "h2" as const, content: "実践のポイント" },
      { type: "p" as const, content: "小さな成功を積み重ね、組織の信頼を獲得することが長期的な解消につながる。技術導入と並行して、組織のマインドセット変革も欠かせない。" },
    ],
  },
  {
    slug: "ai-era-sales-role",
    title: "AI時代に再定義される『セールス』の役割とは",
    category: "AI経営",
    summary:
      "セールスは情報伝達から価値共創へと変容する。AI活用により人的リソースは本質的業務に集中すべきである。",
    meta_description:
      "AI時代におけるセールスの役割変容を解説。情報伝達から価値共創へ、AIと人の補完的関係の設計方法と段階的導入のアプローチを紹介します。",
    image_url: `${EYECATCH_BASE}?text=AI+Sales`,
    status: "published" as const,
    published_at: "2025-02-14T00:00:00Z",
    body: [
      { type: "p" as const, content: "AI時代において、セールスの役割は情報伝達から価値共創へと変容する。人的リソースは本質的業務に集中すべきである。" },
      { type: "h2" as const, content: "セールス機能の再定義" },
      { type: "p" as const, content: "定型業務の自動化により、セールスは顧客との深い対話と戦略的提案に注力できる。役割の再定義は、組織設計の見直しと一体で進める必要がある。" },
      { type: "h3" as const, content: "AIと人的判断の役割分担" },
      { type: "p" as const, content: "AIは情報の収集・分析を担い、人は意思決定と関係構築を担う。この補完的関係の設計が、AI時代のセールス組織の成否を決める。" },
      { type: "h2" as const, content: "実装のアプローチ" },
      { type: "p" as const, content: "段階的なAI導入と、それに伴う業務プロセスの再設計が求められる。現場の巻き込みと、継続的な学習サイクルの構築が成功の鍵である。" },
    ],
  },
  {
    slug: "silent-management",
    title: "静寂な経営：ノイズを排除し本質に向き合うための思考法",
    category: "組織",
    summary:
      "意思決定の質は情報の質に依存する。ノイズを排除し、構造化されたデータに基づく経営が求められる。",
    meta_description:
      "経営のノイズを排除し、本質的な意思決定に集中するための思考法を解説。KPIの厳選やダッシュボード設計など、構造化された情報基盤の構築方法を紹介します。",
    image_url: `${EYECATCH_BASE}?text=Silent+Mgmt`,
    status: "published" as const,
    published_at: "2025-02-13T00:00:00Z",
    body: [
      { type: "p" as const, content: "意思決定の質は、情報の質に依存する。ノイズを排除し、構造化されたデータに基づく経営が、現代の経営者に求められる。" },
      { type: "h2" as const, content: "ノイズの正体" },
      { type: "p" as const, content: "ノイズとは、意思決定に寄与しない情報である。感情的な報告、断片的なデータ、曖昧な指標が、判断を歪める。可視化とフィルタリングが有効だ。" },
      { type: "h3" as const, content: "構造化された情報基盤" },
      { type: "p" as const, content: "KPIの厳選、ダッシュボードの設計、報告プロセスの標準化により、本質的な情報のみが経営層に届く仕組みを構築できる。" },
      { type: "h2" as const, content: "静寂な意思決定" },
      { type: "p" as const, content: "ノイズを排除した環境では、本質的な問いに集中できる。データに基づく冷静な判断が、組織の持続的成長につながる。" },
    ],
  },
  {
    slug: "sales-enablement-structure",
    title: "セールスイネーブルメントにおける構造設計の重要性",
    category: "セールス",
    summary:
      "営業組織の生産性は構造設計で決まる。ツール・プロセス・人材の三位一体の最適化が必要である。",
    meta_description:
      "セールスイネーブルメントの構造設計を解説。ツール・プロセス・人材の三位一体の最適化と、成約率・商談サイクルの計測による継続的改善の方法を紹介します。",
    image_url: `${EYECATCH_BASE}?text=Sales+Enable`,
    status: "published" as const,
    published_at: "2025-02-12T00:00:00Z",
    body: [
      { type: "p" as const, content: "営業組織の生産性は、構造設計で決まる。ツール・プロセス・人材の三位一体の最適化が、セールスイネーブルメントの本質である。" },
      { type: "h2" as const, content: "構造設計の三要素" },
      { type: "p" as const, content: "第一にツール。CRM、提案資料、ナレッジベースの整備である。第二にプロセス。商談ステージの定義と、各ステージでのアクション標準化である。第三に人材。研修とOJTの設計である。" },
      { type: "h3" as const, content: "三位一体の統合" },
      { type: "p" as const, content: "三要素は独立ではなく、相互に連動して初めて効果を発揮する。ツールがプロセスを支え、プロセスが人材の行動を規定する。統合的な設計が不可欠だ。" },
      { type: "h2" as const, content: "計測と改善" },
      { type: "p" as const, content: "構造設計の効果は、成約率・商談サイクル・営業効率で計測する。データに基づく継続的改善が、組織の競争力を高める。" },
    ],
  },
  {
    slug: "data-driven-organization",
    title: "データドリブン経営を実現する組織構造の条件",
    category: "ビジネス",
    summary:
      "データ活用には組織の構造的対応が前提である。意思決定権限とデータアクセスの再設計が不可欠だ。",
    meta_description:
      "データドリブン経営を実現するための組織構造の条件を解説。サイロ化の解消、意思決定権限の分散、データアクセス設計のポイントを紹介します。",
    image_url: `${EYECATCH_BASE}?text=Data+Driven`,
    status: "published" as const,
    published_at: "2025-02-11T00:00:00Z",
    body: [
      { type: "p" as const, content: "データドリブン経営の実現には、組織の構造的対応が前提である。意思決定権限とデータアクセスの再設計が不可欠だ。" },
      { type: "h2" as const, content: "組織構造の障壁" },
      { type: "p" as const, content: "サイロ化した部門、中央集権的な意思決定、データへのアクセス制限が、データ活用を阻害する。構造改革なくしてデータドリブンは実現しない。" },
      { type: "h3" as const, content: "意思決定権限の分散" },
      { type: "p" as const, content: "データに基づく意思決定を現場に委譲するには、権限と責任の明確化が必要である。経営層は戦略的判断に集中し、実行判断はデータを持つ現場に委ねる。" },
      { type: "h2" as const, content: "データアクセスの設計" },
      { type: "p" as const, content: "セキュリティと利便性のバランスを保ちつつ、必要なデータに必要な人がアクセスできる仕組みが求められる。ガバナンスとツールの両面から設計する。" },
    ],
  },
  {
    slug: "b2b-ai-negotiation",
    title: "B2B商談における構造化とAI支援の融合",
    category: "AI経営",
    summary:
      "商談プロセスの構造化はAI活用の前提である。人的判断とAIの補完的関係の設計が鍵となる。",
    meta_description:
      "B2B商談プロセスの構造化とAI支援の融合方法を解説。ステージ定義や入力項目の標準化、AIによる情報要約・リスク検知の活用法を紹介します。",
    image_url: `${EYECATCH_BASE}?text=B2B+AI`,
    status: "published" as const,
    published_at: "2025-02-10T00:00:00Z",
    body: [
      { type: "p" as const, content: "商談プロセスの構造化は、AI活用の前提である。人的判断とAIの補完的関係の設計が、B2B商談の効率化の鍵となる。" },
      { type: "h2" as const, content: "構造化の意義" },
      { type: "p" as const, content: "非構造化された商談プロセスでは、AIは有効に機能しない。ステージ定義、入力項目の標準化、記録の習慣化が、AI支援の土台である。" },
      { type: "h3" as const, content: "AIの補完的役割" },
      { type: "p" as const, content: "AIは情報の要約、次のアクション提案、リスク検知を担う。最終的な判断と顧客との関係構築は、人が担う。役割分担の明確化が重要だ。" },
      { type: "h2" as const, content: "導入のステップ" },
      { type: "p" as const, content: "まずは商談プロセスの可視化と標準化から始める。その上で、AI支援を段階的に導入し、効果を計測しながら拡大するアプローチが有効である。" },
    ],
  },
];

async function seed() {
  console.log("Seeding articles...");

  for (const article of articles) {
    const { error } = await supabase.from("articles").insert(article);

    if (error) {
      console.error(`Failed to insert ${article.slug}:`, error.message);
    } else {
      console.log(`Inserted: ${article.slug}`);
    }
  }

  console.log("Done!");
}

seed();
