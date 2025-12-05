import { useState } from "react";
import { useExtract } from "./useExtract";
import { useHistoryStore } from "../store/useHistoryStore";
import type { OCRResult } from "../types/ocr";

const OCR_API_KEY = import.meta.env.VITE_OCR_API_KEY as string | undefined;

export function useScanLogic() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<OCRResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [tags, setTags] = useState<string>("");

  const { extract } = useExtract();
  const addHistory = useHistoryStore((s) => s.addHistory);

  // Handles image selection: stores the file, clears previous errors & sets up a preview for display
  function handleImageSelected(f: File) {
    setInputError(null);
    setOcrError(null);

    setFile(f);
    setResult(null);

    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  async function processImage() {
    setInputError(null);
    setOcrError(null);

    if (!file) {
      setInputError("Please select an image first.");
      return;
    }

    if (!tags.trim()) {
      setInputError("Please add at least one tag before scanning image.");
      return;
    }

    if (!OCR_API_KEY) {
      setInputError("OCR API key missing. Check your .env file.");
      return;
    }
    setLoading(true);

    try {
      // Converts the selected image to Base64 
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject("Failed to read image");
        reader.readAsDataURL(file);
      });

      // Prepares the image data and API key sends it to the OCR API and gets the parsed JSON result
      const form = new FormData();
      form.append("apikey", OCR_API_KEY);
      form.append("base64Image", base64);
      form.append("language", "eng");

      const resp = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: form,
      });

      const json = await resp.json();

      // Checks OCR API response for errors, extracts text, and parses it into phones, emails, and URLs
      if (json.IsErroredOnProcessing) {
        setOcrError(json.ErrorMessage || "OCR failed.");
        return;
      }

      const extractedText = json.ParsedResults?.[0]?.ParsedText || "";

      if (!extractedText.trim()) {
        setOcrError("No text detected.");
        return;
      }
      const raw = extract(extractedText);

      const normalized: OCRResult = {
        Phones: raw.phones,
        Emails: raw.emails,
        urls: raw.urls,
      };

      // Checks if OCR found any phone, email, or URL
      const isEmpty =
        normalized.Phones.length === 0 &&
        normalized.Emails.length === 0 &&
        normalized.urls.length === 0;

      if (isEmpty) {
        setOcrError("No information found in the image.");
        return;
      }

      // Saves the parsed OCR results to state and adds them to history with date and user-defined tags
      setResult(normalized);
      addHistory({
        ...normalized,
        date: new Date().toISOString(),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
    } catch (err) {
      console.error(err);
      setOcrError("Failed to process image.");
    }

    setLoading(false);
  }

  function resetAll() {
    if (preview) URL.revokeObjectURL(preview);

    setFile(null);
    setPreview(null);
    setResult(null);
    setTags("");
    setInputError(null);
    setOcrError(null);
    setLoading(false);
  }

  return {
    file,
    preview,
    result,
    loading,
    inputError,
    ocrError,
    tags,
    setTags,
    handleImageSelected,
    processImage,
    resetAll,
  };
}
