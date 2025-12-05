export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-[#021416] dark:border-[#04343b] border p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 dark:text-[#aef9da]">
          About OCR Scanner
        </h2>

        <p className="text-gray-700 dark:text-[#8be7c7] leading-relaxed text-lg">
          An OCR (Optical Character Recognition) scanner is a digital tool that
          converts printed or handwritten text into machine readable data. Instead
          of manually typing information from documents, the OCR scanner 
          automatically analyzes an image, detects characters, and transforms 
          them into editable and searchable text.
        </p>

        <p className="mt-4 text-gray-700 dark:text-[#8be7c7] leading-relaxed text-lg">
          This technology increases speed, accuracy, and efficiency when handling
          receipts, forms, business documents, ID cards, or any text-based images.
          It is widely used in mobile apps, data automation systems, document 
          digitization platforms and business workflows where fast and reliable 
          text extraction is required.
        </p>

        <div className="mt-6 p-4 rounded-xl bg-gray-100 dark:bg-[#031d24] border dark:border-[#03303a]">
          <h3 className="text-xl font-semibold mb-2 dark:text-[#aef9da]">
            Key Benefits
          </h3>
          <ul className="list-disc ml-6 text-gray-700 dark:text-[#bfffe8] space-y-1">
            <li>Extracts phone numbers, emails and URLs instantly from images</li>
            <li>Improves accuracy over manual typing</li>
            <li>Can detect phone numbers, emails, and URLs</li>
            <li>Reduces workload and speeds up digital processes</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
