import React, { useState } from "react";
import { toast } from "react-toastify";

const OrderFormModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate file type
    if (!file) {
      toast.error("Please upload a document.");
      return;
    }

    const fileType = file.type;
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // PDF and DOCX
    if (!validTypes.includes(fileType)) {
      toast.error("Invalid file type. Please upload a PDF or DOCX file.");
      return;
    }

    // Estimate cost (e.g., $2 per page)
    const estimatedCost = 2; // Implement actual cost estimation logic based on file length or pages
    toast.success(`Estimated cost is $${estimatedCost} per page.`);

    // Handle API submission here

    onClose(); // Close modal after submission
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-5 rounded shadow-lg">
          <h2 className="text-lg font-semibold">New Order</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf, .docx"
              className="border p-2 w-full"
              required
            />
            <select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="border p-2 w-full mt-2"
              required
            >
              <option value="">Select Source Language</option>
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
              {/* Add more languages as needed */}
            </select>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="border p-2 w-full mt-2"
              required
            >
              <option value="">Select Target Language</option>
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
              {/* Add more languages as needed */}
            </select>
            <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
              Pay Now
            </button>
          </form>
          <button onClick={onClose} className="mt-2 text-red-500">Close</button>
        </div>
      </div>
    )
  );
};

export default OrderFormModal;
