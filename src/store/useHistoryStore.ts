import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OCRResult } from "../types/ocr";

export interface HistoryItem extends OCRResult {
  date: string;
  tags: string[];
}

interface HistoryState {
  history: HistoryItem[];
  addHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
  removeHistoryItem: (index: number) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],

      addHistory: (item) =>
        set((state) => ({
          history: [...state.history, { ...item, tags: item.tags ?? [] }],
        })),

      clearHistory: () =>
        set({
          history: [],
        }),

      removeHistoryItem: (index) =>
        set((state) => ({
          history: state.history.filter((_, i) => i !== index),
        })),
    }),

    { name: "ocr-history" }
  )
);
