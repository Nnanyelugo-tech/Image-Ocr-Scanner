export function useExtract() {
  // Function to extract phones, emails, and URLs from OCR text
  const extract = (text: string) => {
    const phones = text.match(/\+?\d[\d\s\-()]{6,}\d/g) || [];
    const emails =
      text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}/g) || [];
    const urls = text.match(/https?:\/\/[^\s)]+/g) || [];

    const unique = (arr: string[]) =>
      // Remove duplicates + extra spaces
      Array.from(new Set(arr.map((s) => s.trim())));

    return {
      phones: unique(phones),
      emails: unique(emails),
      urls: unique(urls),
    };
  };
  // Expose 'extract' function to other components
  return { extract };
}
