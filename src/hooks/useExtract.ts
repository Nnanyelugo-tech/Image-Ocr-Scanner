// Hook to extract phones, emails, and URLs from OCR text
export function useExtract() {
  // Function to extract phones, emails, and URLs from OCR text
  const extract = (text: string) => {
    // Strict phone number regex
    const phoneRegex =
      /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g;

    const phones = text.match(phoneRegex) || [];

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

  return { extract };
}
