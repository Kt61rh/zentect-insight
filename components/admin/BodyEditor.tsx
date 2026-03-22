"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { BodyBlock } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

type Props = {
  blocks: BodyBlock[];
  onChange: (blocks: BodyBlock[]) => void;
};

function ImageBlockEditor({
  block,
  onUpdate,
}: {
  block: BodyBlock & { type: "image" };
  onUpdate: (url: string, alt: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("5MB以下にしてください");
      return;
    }

    setUploading(true);
    setError("");

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const fileName = `body/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("articles")
      .upload(fileName, file);

    if (uploadError) {
      setError(`アップロード失敗: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("articles").getPublicUrl(fileName);
    onUpdate(data.publicUrl, block.alt ?? "");
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex-1 space-y-2">
      {block.content ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border border-gray-200">
          <Image
            src={block.content}
            alt={block.alt ?? ""}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <label
          className={`flex aspect-video w-full max-w-sm cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-sm text-gray-400 transition-colors hover:border-brand-teal hover:text-brand-teal ${
            uploading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {uploading ? "アップロード中..." : "クリックして画像を選択"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}

      {block.content && (
        <label
          className={`inline-block cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 ${
            uploading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {uploading ? "アップロード中..." : "画像を変更"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}

      <input
        type="text"
        value={block.alt ?? ""}
        onChange={(e) => onUpdate(block.content, e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
        placeholder="代替テキスト（alt）を入力..."
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function BodyEditor({ blocks, onChange }: Props) {
  function updateBlock(index: number, field: string, value: string) {
    const updated = [...blocks];
    if (field === "type") {
      const newType = value as BodyBlock["type"];
      if (newType === "image") {
        updated[index] = { type: "image", content: "", alt: "" };
      } else {
        updated[index] = { type: newType, content: updated[index].content };
      }
    } else {
      updated[index] = { ...updated[index], content: value };
    }
    onChange(updated);
  }

  function updateImageBlock(index: number, url: string, alt: string) {
    const updated = [...blocks];
    updated[index] = { type: "image", content: url, alt };
    onChange(updated);
  }

  function addBlock(type: BodyBlock["type"] = "p") {
    if (type === "image") {
      onChange([...blocks, { type: "image", content: "", alt: "" }]);
    } else {
      onChange([...blocks, { type, content: "" }]);
    }
  }

  function removeBlock(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }

  function moveBlock(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocks.length - 1)
    )
      return;

    const updated = [...blocks];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">本文</label>

      {blocks.map((block, index) => (
        <div
          key={index}
          className="flex items-start gap-2 rounded-md border border-gray-200 bg-white p-3"
        >
          <select
            value={block.type}
            onChange={(e) => updateBlock(index, "type", e.target.value)}
            className="rounded border border-gray-300 px-2 py-1.5 text-sm"
          >
            <option value="p">段落</option>
            <option value="h2">見出し H2</option>
            <option value="h3">小見出し H3</option>
            <option value="image">画像</option>
          </select>

          {block.type === "image" ? (
            <ImageBlockEditor
              block={block}
              onUpdate={(url, alt) => updateImageBlock(index, url, alt)}
            />
          ) : (
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(index, "content", e.target.value)}
              rows={block.type === "p" ? 3 : 1}
              className="flex-1 resize-none rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
              placeholder={
                block.type === "h2"
                  ? "見出しを入力..."
                  : block.type === "h3"
                    ? "小見出しを入力..."
                    : "本文を入力..."
              }
            />
          )}

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => moveBlock(index, "up")}
              disabled={index === 0}
              className="rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:invisible"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => moveBlock(index, "down")}
              disabled={index === blocks.length - 1}
              className="rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:invisible"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => removeBlock(index)}
              className="rounded px-1.5 py-0.5 text-xs text-red-400 hover:bg-red-50 hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => addBlock("p")}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          + 段落
        </button>
        <button
          type="button"
          onClick={() => addBlock("h2")}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          + H2
        </button>
        <button
          type="button"
          onClick={() => addBlock("h3")}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          + H3
        </button>
        <button
          type="button"
          onClick={() => addBlock("image")}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          + 画像
        </button>
      </div>
    </div>
  );
}
