"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // バリデーション
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("ファイルサイズは5MB以下にしてください");
      return;
    }

    setUploading(true);
    setError("");

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("articles")
      .upload(fileName, file);

    if (uploadError) {
      setError(`アップロード失敗: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("articles").getPublicUrl(fileName);
    onChange(data.publicUrl);
    setUploading(false);

    // input をリセット
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        アイキャッチ画像
      </label>

      {value && (
        <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-md border border-gray-200">
          <Image
            src={value}
            alt="アイキャッチ"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white hover:bg-black/70"
          >
            削除
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <label
          className={`cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 ${
            uploading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {uploading ? "アップロード中..." : "画像を選択"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
        <span className="text-xs text-gray-400">5MB以下 / JPG, PNG, WebP</span>
      </div>

      {/* URL直接入力も残す */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
        placeholder="または画像URLを直接入力"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
