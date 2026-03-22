"use client";

import type { BodyBlock } from "@/lib/types";

type Props = {
  blocks: BodyBlock[];
  onChange: (blocks: BodyBlock[]) => void;
};

export function BodyEditor({ blocks, onChange }: Props) {
  function updateBlock(index: number, field: string, value: string) {
    const updated = [...blocks];
    if (field === "type") {
      updated[index] = {
        type: value as BodyBlock["type"],
        content: updated[index].content,
      };
    } else {
      updated[index] = { ...updated[index], content: value };
    }
    onChange(updated);
  }

  function addBlock(type: BodyBlock["type"] = "p") {
    onChange([...blocks, { type, content: "" }]);
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
          </select>

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
      </div>
    </div>
  );
}
