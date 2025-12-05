import { useHistoryStore } from "../store/useHistoryStore";
import { useState } from "react";
import type { HistoryItem } from "../store/useHistoryStore";

export function useHistoryLogic() {
  // Get all saved scan history
  const history = useHistoryStore((s) => s.history);
   // Function to clear all history
  const clearHistory = useHistoryStore((s) => s.clearHistory);
  // Remove a single history entry
  const removeHistoryItem = useHistoryStore((s) => s.removeHistoryItem);

  // Text used to filter by tag
  const [tagQuery, setTagQuery] = useState("");
  // Tracks which card is currently copied
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Copy full card data to clipboard and show toast
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

  // Filter history items based on tag search
  const filteredHistory = history.filter((item) =>
    item.tags?.some((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase()))
  );

  // Expose all states and actions to the UI
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
