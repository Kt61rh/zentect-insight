"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logout } from "@/app/(admin)/admin/(dashboard)/actions";

const navItems = [
  { href: "/admin", label: "ダッシュボード" },
  { href: "/admin/articles", label: "記事一覧" },
  { href: "/admin/generate", label: "AI記事生成" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        <Link href="/admin">
          <Image
            src="/zentect-logo.svg"
            alt="zentect"
            width={100}
            height={30}
            className="h-7 w-auto"
          />
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-teal/10 text-brand-teal"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-200 px-3 py-4">
        <button
          onClick={() => logout()}
          className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          ログアウト
        </button>
      </div>
    </aside>
  );
}
