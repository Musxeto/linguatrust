import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase"; 
import { addDoc, collection } from "firebase/firestore"; 
import CreatableSelect from "react-select/creatable";

const OrderFormModal = ({ isOpen, onClose, onOrderSubmission }) => {
  const [file, setFile] = useState(null);
  const [sourceLanguage, setSourceLanguage] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState(null);

  const handleSubmit = async (e) => {
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
    const estimatedCost = 2; // Example cost calculation, you can implement logic based on file length
    toast.success(`Estimated cost is $${estimatedCost} per page.`);

    try {
      // Create a new order object
      const newOrder = {
        status: "In Progress",
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
        fileName: file.name,
        // Other order details can go here
      };

      // Save order to Firestore
      await addDoc(collection(db, "clientOrders"), newOrder);

      // Call the passed function to update the ClientHome state
      onOrderSubmission(newOrder);

      onClose(); // Close modal after submission
    } catch (error) {
      toast.error("Error submitting order: " + error.message);
      console.error(error);
    }
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
            <CreatableSelect
              isClearable
              options={languageOptions}
              onChange={(selectedOption) => setSourceLanguage(selectedOption?.value || null)}
              placeholder="Select Source Language"
              className="mt-2"
            />
            <CreatableSelect
              isClearable
              options={languageOptions}
              onChange={(selectedOption) => setTargetLanguage(selectedOption?.value || null)}
              placeholder="Select Target Language"
              className="mt-2"
            />
            <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
              Submit Order
            </button>
          </form>
          <button onClick={onClose} className="mt-2 text-red-500">Close</button>
        </div>
      </div>
    )
  );
};

const languageOptions = [
    { label: "English", value: "English" },
    { label: "Urdu", value: "Urdu" },
    { label: "Spanish", value: "Spanish" },
    { label: "Mandarin Chinese", value: "Mandarin Chinese" },
    { label: "Hindi", value: "Hindi" },
    { label: "French", value: "French" },
    { label: "Arabic", value: "Arabic" },
    { label: "Bengali", value: "Bengali" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Russian", value: "Russian" },
    { label: "Japanese", value: "Japanese" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "German", value: "German" },
    { label: "Korean", value: "Korean" },
    { label: "Vietnamese", value: "Vietnamese" },
    { label: "Italian", value: "Italian" },
    { label: "Turkish", value: "Turkish" },
    { label: "Persian", value: "Persian" },
    { label: "Polish", value: "Polish" },
    { label: "Dutch", value: "Dutch" },
    { label: "Swedish", value: "Swedish" },
    { label: "Greek", value: "Greek" },
    { label: "Czech", value: "Czech" },
    { label: "Hungarian", value: "Hungarian" },
    { label: "Thai", value: "Thai" },
    { label: "Hebrew", value: "Hebrew" },
    { label: "Romanian", value: "Romanian" },
    { label: "Indonesian", value: "Indonesian" },
    { label: "Ukrainian", value: "Ukrainian" },
    { label: "Malay", value: "Malay" },
    { label: "Finnish", value: "Finnish" },
    { label: "Norwegian", value: "Norwegian" },
    { label: "Danish", value: "Danish" },
    { label: "Serbian", value: "Serbian" },
    { label: "Croatian", value: "Croatian" },
    { label: "Bulgarian", value: "Bulgarian" },
    { label: "Slovak", value: "Slovak" },
    { label: "Slovenian", value: "Slovenian" },
    { label: "Lithuanian", value: "Lithuanian" },
    { label: "Latvian", value: "Latvian" },
    { label: "Estonian", value: "Estonian" },
    { label: "Icelandic", value: "Icelandic" },
    { label: "Maltese", value: "Maltese" },
    { label: "Welsh", value: "Welsh" },
    { label: "Irish", value: "Irish" },
    { label: "Scottish Gaelic", value: "Scottish Gaelic" },
    { label: "Afrikaans", value: "Afrikaans" },
    { label: "Swahili", value: "Swahili" },
    { label: "Zulu", value: "Zulu" },
    { label: "Xhosa", value: "Xhosa" },
  ];


export default OrderFormModal;
