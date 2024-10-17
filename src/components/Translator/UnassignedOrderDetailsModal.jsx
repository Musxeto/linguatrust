import React from 'react';
import Modal from 'react-modal';
import CreatableSelect from 'react-select'; // Import react-select
import { auth } from '../../firebase';

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

const UnassignedOrderDetailsModal = ({ isOpen, onRequestClose, order, sourceLang, targetLang, setSourceLang, setTargetLang, onConfirmSelection }) => {
  if (!order) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="w-full max-w-lg mx-auto p-4 rounded bg-white shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <p className="mb-2"><strong>Client Email:</strong> {order.clientEmail}</p>
      <p className="mb-2">
        <strong>Document Link:</strong> 
        <a href={order.documentLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Document</a>
      </p>
      <p className="mb-2"><strong>Estimated Cost:</strong> ${order.estimatedCost}</p>
      <p className="mb-2"><strong>Page Count:</strong> {order.pageCount}</p>
      <p className="mb-2"><strong>Source Language:</strong> {order.sourceLanguage}</p>
      <p className="mb-2"><strong>Target Language:</strong> {order.targetLanguage}</p>
      <p className="mb-4"><strong>Status:</strong> {order.status}</p>

      <div className="flex justify-between">
        <button 
          onClick={onConfirmSelection} 
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-200"
        >
          Confirm Selection
        </button>
        <button 
          onClick={onRequestClose} 
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default UnassignedOrderDetailsModal;
