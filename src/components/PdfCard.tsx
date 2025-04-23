// src/components/PdfCard.tsx

import { useState } from "react"; // Import React if using JSX
import { Document, Page } from "react-pdf";

// --- Don't forget the pdf.js worker setup & CSS imports are still needed in App.tsx ---

function PdfCard() {
  // Using null as initial state for numPages is slightly safer
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Add back loading and error states for better UX
  const [isLoading, setIsLoading] = useState(true);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // --- Hardcoded PDF Path (as per your working version) ---
  // Consider passing this as a prop again later for reusability
  const pdfFile = "/GIROMAT_EVO_V12/PR15118__00_A4_GIROMATEVOV12.PDF";

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false); // PDF loaded successfully
    setPdfError(null); // Clear any previous errors
  }

  function onDocumentLoadError(error: Error): void {
    console.error("Error loading PDF:", error);
    setPdfError(`Failed to load PDF file. ${error.message}`);
    setIsLoading(false); // Finished loading (with an error)
  }

  // TODO: Add functions to change pageNumber if needed for multi-page docs
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }
  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    // --- 1. Card Container (Tailwind) ---
    // Add padding, background, shadow, border, rounded corners, max-width, margin
    <div className="bg-red-300 rounded-lg shadow-md border border-gray-200 p-4 md:p-6 max-w-xl mx-auto my-6">
      {/* --- Optional: Loading State --- */}
      {isLoading && (
        <div className="flex justify-center items-center h-64 text-gray-500">
          Loading PDF...
        </div>
      )}

      {/* --- Optional: Error State --- */}
      {pdfError && !isLoading && (
        <div
          className="flex flex-col justify-center items-center h-64 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <strong className="font-bold mb-2">Error!</strong>
          <span className="block sm:inline">{pdfError}</span>
        </div>
      )}

      {/* --- 2. PDF Viewer Container (Hidden during load/error) --- */}
      {/* Use overflow-hidden to prevent the PDF from spilling out if sizing is tricky */}
      <div
        className={`pdf-viewer-container ${
          isLoading || pdfError
            ? "hidden"
            : "overflow-hidden flex justify-center"
        }`}
      >
        <Document
          file={pdfFile} // Using the hardcoded path for now
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          // Optional: Add class for specific Document styling if needed
          // className="flex justify-center"
        >
          {/* --- 3. PDF Page Sizing & Rendering --- */}
          <Page
            pageNumber={pageNumber}
            // Explicitly set width OR scale. Width is often easier for card layout.
            // Adjust this width to fit your card design.
            // Using a responsive width might require more complex logic or container-based sizing.
            width={500} // Example width, adjust as needed!
            // Ensure text/annotations layers are enabled (relies on CSS in App.tsx)
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      {/* --- 4. Page Number Styling (Tailwind) --- */}
      {!isLoading && !pdfError && numPages && (
        <div className="flex justify-center">
          <h3 className="text-center text-sm text-gray-600 mt-4">
            Page {pageNumber} of {numPages}
          </h3>
          <hr />
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <h3>Previous</h3>
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PdfCard;
