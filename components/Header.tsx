import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/zentect-logo.svg"
            alt="zentect"
            width={120}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <a
          href="#contact"
          className="rounded-md bg-brand-teal px-4 py-2 font-medium text-white transition-colors hover:bg-brand-teal/90"
        >
          お問い合わせ
        </a>
      </div>
    </header>
  );
}
