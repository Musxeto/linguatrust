import React from "react";
import { FiX } from "react-icons/fi";

const OrderDetailsModal = ({ order, closeModal }) => {
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
          <iframe
            title="PDF Viewer"
            src={order.documentLink}
            width="100%"
            height="200px"
            className="border-none"
          />
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
