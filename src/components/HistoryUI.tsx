import { Link } from "react-router-dom";
import { useState } from "react";
import type { HistoryUIProps } from "../types/historyUI";

export function HistoryUI({
  history,
  filteredHistory,
  tagQuery,
  setTagQuery,
  copiedIndex,
  copyCard,
  removeHistoryItem,
  clearHistory,
}: HistoryUIProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="max-w-5xl mx-auto p-6 relative">
      {/* Page header with title + navigation */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#aef9da]">Scan History</h2>
          <p className="text-sm text-[#8be7c7]">
            Previously scanned results saved here...
          </p>
        </div>
        {/* Back button + clear history if available */}
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
          <Link
            to="/"
            className="
      px-0 py-1.5 text-xs
      sm:px-2 sm:py-2 sm:text-sm
      bg-[#033543] rounded text-center
      w-full sm:w-auto
    "
          >
            Back to Scan
          </Link>

          {history.length > 0 && (
            <button
              className="
        px-0 py-1.5 text-xs
        sm:px-2 sm:py-2 sm:text-sm
        bg-red-500 rounded text-center
        w-full sm:w-auto
      "
              onClick={() => setShowConfirm(true)}
            >
              Clear History
            </button>
          )}
        </div>
      </header>

      {/* Tag search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by tag..."
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
          className="w-full p-3 border border-[#054148] text-[#bfffe8] rounded bg-[#021416]"
        />
      </div>

      {/* Display scanned cards */}
      <section className="space-y-4">
        {/* When no history matches the search */}
        {filteredHistory.length === 0 && (
          <div className="bg-[#021416] p-6 rounded-2xl border border-[#03303a] text-[#89e6c7]">
            No matching history.
          </div>
        )}
        {/* Loop through all filtered items and render each card */}
        {filteredHistory.map((item, idx) => {
          const realIndex = history.indexOf(item);

          return (
            <div
              key={idx}
              className="relative bg-[#081b21] p-3 rounded-2xl border border-[#054148]"
            >
              {/* Show "Copied!" toast when card is copied */}
              {copiedIndex === idx && (
                <div className="absolute top-15 right-3 bg-[#081b21] text-white px-3 py-1 rounded text-xs shadow animate-cardToast">
                  Copied!
                </div>
              )}

              {/* Card header with timestamp + buttons */}
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-[#8be7c7]">
                  {new Date(item.date).toLocaleString()}
                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-3 space-y-3 sm:space-y-0">
                  {/* Copy card button */}
                  <button
                    onClick={() => copyCard(item, idx)}
                    className="text-xs px-3 py-1 bg-[#033543] text-white rounded"
                  >
                    Copy
                  </button>
                  {/* Remove this specific card */}
                  <button
                    onClick={() => removeHistoryItem(realIndex)}
                    className="text-xs px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Card content showing Phones, Emails, URLs */}
              <div className="grid gap-2 text-[#bfffe8] break-all whitespace-normal overflow-hidden">
                <div>
                  <strong>Phones:</strong>{" "}
                  {item.Phones.length ? item.Phones.join(", ") : "None"}
                </div>

                <div>
                  <strong>Emails:</strong>{" "}
                  {item.Emails.length ? item.Emails.join(", ") : "None"}
                </div>

                <div>
                  <strong>URLs:</strong>{" "}
                  {item.urls && item.urls.length > 0
                    ? item.urls.map((u, i) => (
                        <a
                          key={i}
                          href={u}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-300"
                        >
                          {u}
                          {i < item.urls.length - 1 ? ", " : ""}
                        </a>
                      ))
                    : "None"}
                </div>
              </div>

              {/* Render tags for this history item */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded bg-[#033543] text-[#aef9da]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#081b21] p-6 rounded-xl border border-[#054148] w-80 text-center">
            <h3 className="text-lg font-semibold text-[#aef9da] mb-3">
              Clear All History?
            </h3>
            <p className="text-sm text-[#8be7c7] mb-5">
              This action cannot be undone. Are you sure you want to delete all
              scan history permanently?
            </p>

            <div className="flex justify-between">
              <button
                className="px-2 py-2 bg-red-500 text-white rounded"
                onClick={() => {
                  clearHistory();
                  setShowConfirm(false);
                }}
              >
                Yes Clear
              </button>

              <button
                className="px-4 py-2 bg-[#033543] text-[#aef9da] rounded"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
