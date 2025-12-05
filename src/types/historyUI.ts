import type { HistoryItem } from "../store/useHistoryStore";

export interface HistoryUIProps {
  history: HistoryItem[];
  filteredHistory: HistoryItem[];
  tagQuery: string;
  setTagQuery: (value: string) => void;
  copiedIndex: number | null;
  copyCard: (item: HistoryItem, index: number) => void;
  removeHistoryItem: (index: number) => void;
  clearHistory: () => void;
}
