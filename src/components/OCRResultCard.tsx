import { useState } from "react";
import { createVCard, downloadVCard } from "../utils/vcard";
import type { OCRResultCardProps } from "../types/ocrResultCard";

export function OCRResultCard({ title, items, type }: OCRResultCardProps) {
  // Toast message for user actions
  const [toast, setToast] = useState<string | null>(null);

  // Don't render card if there are no items
  if (!items || items.length === 0) return null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1000);
  };

   // Prepare vCard fields based on the item type
  const phones = type === "phone" ? items : [];
  const emails = type === "email" ? items : [];
  const urls = type === "url" ? items : [];

  const copyAll = async () => {
    await navigator.clipboard.writeText(items.join("\n"));
    showToast("Copied!");
  };

  const saveAll = () => {
    const vcard = createVCard("New Contact", phones, emails, urls);
    // Trigger vCard download
    downloadVCard(`contact-${type}-all.vcf`, vcard);
    showToast("Saved!");
  };

  return (
    <div className="relative bg-[#081b21] border border-[#054148] p-4 rounded-2xl shadow-neon">
      {/* Toast message display */}
      {toast && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-3 py-1 rounded">
          {toast}
        </div>
      )}

      <h3 className="text-lg font-semibold mb-3 text-[#bfffe8]">{title}</h3>
     {/* List of OCR extracted items */}
      <ul className="space-y-2 mb-3">
        {items.map((value, i) => (
          <li
            key={i}
            className="group relative bg-[#021416] p-2 rounded text-[#bfffe8] wrap-break-word text-sm"
          >
            {value}
            {/* Copy individual item */}
            <button
              className="opacity-0 group-hover:opacity-100 transition absolute right-2 top-1/2 -translate-y-1/2 
                   bg-[#00ffc3] text-black text-[10px] px-2 py-1 rounded"
              onClick={async () => {
                // Copy single item
                await navigator.clipboard.writeText(value);
                showToast("Copied!");
              }}
            >
              Copy
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-3 justify-end">
        {/* Action buttons */}
        <button
          className="flex text-xs px-3 py-2 bg-[#00ffc3] rounded text-black"
          onClick={copyAll}
        >
          Copy
        </button>

        <button
          className="flex text-xs px-3 py-2 bg-[#00a6ff] rounded text-black"
          // Save items to a vCard file
          onClick={saveAll}
        >
          Save
        </button>
      </div>
    </div>
  );
}
