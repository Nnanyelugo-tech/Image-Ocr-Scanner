import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OCRResult } from "../types/ocr";

export interface HistoryItem extends OCRResult {
  date: string;
  tags: string[];
}

interface HistoryState {
  // Array of all saved scan results
  history: HistoryItem[];
  // Add a new history entry
  addHistory: (item: HistoryItem) => void;
  // Remove all history items
  clearHistory: () => void;
  // Delete one history item by index
  removeHistoryItem: (index: number) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],

      addHistory: (item) =>
        set((state) => ({
          // Add new item to history, ensuring tags is always an array
          history: [...state.history, { ...item, tags: item.tags ?? [] }],
        })),

      clearHistory: () =>
        set({
          history: [],
        }),

      removeHistoryItem: (index) =>
        set((state) => ({
          // Remove a single item by filtering it out
          history: state.history.filter((_, i) => i !== index),
        })),
    }),

    { name: "ocr-history" }
  )
);
