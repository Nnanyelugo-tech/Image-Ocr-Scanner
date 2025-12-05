import type { OCRResult } from "./ocr";

export interface ScanUIProps {
  preview: string | null;
  inputError: string | null;
  ocrError: string | null;
  result: OCRResult | null;
  tags: string;
  onTagChange: (value: string) => void;
  handleImageSelected: (file: File) => void;
  processImage: () => void;
  resetAll: () => void;
  loading: boolean;
}
