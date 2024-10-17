import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FiX } from "react-icons/fi";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const OrderDetailsModal = ({ order, closeModal }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onDocumentLoadError = (error) => {
    setError(error.message);
  };

  const isPdf = order.documentLink.toLowerCase().endsWith(".pdf");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            {order.sourceLanguage} to {order.targetLanguage}
          </h2>
          <button onClick={closeModal}>
            <FiX size={24} className="text-red-500" />
          </button>
        </div>
        <p>Status: {order.status}</p>
        <p>Assigned to: {order.translatorName}</p>

        <div className="mt-4">
          {isPdf ? (
            <>
              <Document
                file={order.documentLink}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-between mt-4">
                <button
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber(pageNumber - 1)}
                  className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={pageNumber >= numPages}
                  onClick={() => setPageNumber(pageNumber + 1)}
                  className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="mt-4">
              Document:{" "}
              <a
                href={order.documentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {order.documentLink}
              </a>
            </p>
          )}
        </div>

        <button
          onClick={closeModal}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
