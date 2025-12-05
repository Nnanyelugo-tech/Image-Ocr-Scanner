import { useHistoryStore } from "../store/useHistoryStore";
import { useState } from "react";
import type { HistoryItem } from "../store/useHistoryStore";

export function useHistoryLogic() {
  const history = useHistoryStore((s) => s.history);
  const clearHistory = useHistoryStore((s) => s.clearHistory);
  const removeHistoryItem = useHistoryStore((s) => s.removeHistoryItem);

  const [tagQuery, setTagQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Copy history card text
  const copyCard = (item: HistoryItem, index: number) => {
    const text = `
Phones: ${item.Phones.length ? item.Phones.join(", ") : "None"}
Emails: ${item.Emails.length ? item.Emails.join(", ") : "None"}
URL: ${item.urls ?? "None"}
Tags: ${item.tags?.length ? item.tags.join(", ") : "None"}
`.trim();

    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  };

  // filtering
  const filteredHistory = history.filter((item) =>
    item.tags?.some((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase()))
  );

  return {
    history,
    tagQuery,
    copiedIndex,
    filteredHistory,
    setTagQuery,
    copyCard,
    removeHistoryItem,
    clearHistory,
  };
}
