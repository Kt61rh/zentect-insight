import Link from "next/link";

const sitemapLinks = [
  {
    title: "サービス",
    links: [
      { label: "zentect Insight", href: "/" },
      { label: "導入事例", href: "#" },
      { label: "料金プラン", href: "#" },
    ],
  },
  {
    title: "会社情報",
    links: [
      { label: "会社概要", href: "#" },
      { label: "ニュース", href: "#" },
      { label: "採用情報", href: "#" },
    ],
  },
  {
    title: "サポート",
    links: [
      { label: "お問い合わせ", href: "#contact" },
      { label: "よくある質問", href: "#" },
      { label: "資料ダウンロード", href: "#" },
    ],
  },
  {
    title: "法的情報",
    links: [
      { label: "プライバシーポリシー", href: "#" },
      { label: "利用規約", href: "#" },
      { label: "特定商取引法", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t-2 border-gray-200 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <nav className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {sitemapLinks.map((item) => (
            <div key={item.title}>
              <h3 className="mb-4 text-sm font-semibold text-brand-black">
                {item.title}
              </h3>
              <ul className="space-y-2">
                {item.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-brand-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
