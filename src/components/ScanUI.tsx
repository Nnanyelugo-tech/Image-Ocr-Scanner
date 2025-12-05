import { UploadBox } from "./UploadBox";
import { OCRResultCard } from "./OCRResultCard";
import type { ScanUIProps } from "../types/scan";

export function ScanUI({
  preview,
  inputError,
  ocrError,
  result,
  tags,
  onTagChange,
  handleImageSelected,
  processImage,
  resetAll,
  loading,
}: ScanUIProps) {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-[#aef9da]">Image OCR Scanner</h2>
        <p className="text-sm text-[#8be7c7]">
          Upload an image and extract phone numbers, emails and URLs.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE — Upload + Buttons */}
        <div className="col-span-1">

          {/* Image Preview Box or UploadBox */}
          <div
            className="w-full min-h-[400px] bg-[#021416] border border-[#04343b] rounded-2xl p-4 
               flex items-center justify-center overflow-hidden"
          >
            {!preview ? (
              <UploadBox
                onImageSelected={handleImageSelected}
                helper="Drop or choose an image"
              />
            ) : (
              <img
              // Show preview of selected image
                src={preview}
                alt="preview"
                className="w-full h-full object-contain rounded"
              />
            )}
          </div>
          {/* Scan + Reset Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={processImage}
              disabled={loading}
              className="flex-1 bg-[#06303a] text-[#aef9da] px-4 py-2 rounded hover:bg-[#07424b] transition-colors"
            >
              {loading ? "Scanning…" : "Scan Image"}
            </button>

            <button
              onClick={resetAll}
              className="flex-1 bg-red-500 text-[#aef9da] px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
          </div>
           {/* Error if user submits without uploading an image */}
          {inputError && <div className="mt-3 text-red-400">{inputError}</div>}
        </div>
         {/* RIGHT SIDE — Results, Tags, OCR Output */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          {/* Tag Input Field */}
          <p className="text-sm text-[#8be7c7] mb-1">
            Add tags to organize and save scan to history.(Example: work, receipt, personal)
          </p>

          <input
            type="text"
            placeholder="Add tags (comma separated)"
            value={tags}
            onChange={(e) => onTagChange(e.target.value)}
            className="w-full p-2 rounded-2xl bg-[#021416] border border-[#054148] text-[#bfffe8]"
          />
 
          {/* Placeholder before results or errors appear */}
          {!result && !ocrError && (
            <div className="bg-[#021416] p-6 rounded-2xl border border-[#03303a]">
              <p className="text-[#89e6c7]">Results will appear here…</p>
            </div>
          )}
           
           {/* OCR Error Display */}
          {ocrError && (
            <div className="bg-[#230000] p-6 rounded-2xl border border-red-800">
              <p className="text-red-400">{ocrError}</p>
            </div>
          )}

          {/* OCR Results Section */}
          {result && (
            <div className="space-y-4">
              <OCRResultCard
                title="Phone Numbers"
                items={result.Phones}
                type="phone"
              />
              <OCRResultCard
                title="Emails"
                items={result.Emails}
                type="email"
              />
              <OCRResultCard
                title="Website URLs"
                items={result.urls}
                type="url"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
