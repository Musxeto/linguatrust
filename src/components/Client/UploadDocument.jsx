import React, { useState } from "react";
import { storage, db } from "../../firebase"; // Firebase config
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import mammoth from "mammoth"; 
import { useAuth } from "../../contexts/AuthContext";

const COST = 2;

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

const UploadDocument = ({ closePopup }) => {
  const [file, setFile] = useState(null);
  const [sourceLang, setSourceLang] = useState(null);
  const [targetLang, setTargetLang] = useState(null);
  const [pages, setPages] = useState(0); 
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); 
  const [popupVisible, setPopupVisible] = useState(true); 
  const {currentUser,userData} = useAuth();

  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handlePopupClose = () => {
    setPopupVisible(false);
    closePopup(); 
  };

  const handleSourceLangChange = (selectedOption) =>
    setSourceLang(selectedOption);

  const handleTargetLangChange = (selectedOption) =>
    setTargetLang(selectedOption);

  const handlePayNow = async () => {
    if (!file || !sourceLang || !targetLang || !pages) return; 
    setIsLoading(true);
  
    try {
      const fileRef = ref(storage, `documents/${file.name}`);
      await uploadBytes(fileRef, file); 
  
      
      const downloadURL = await getDownloadURL(fileRef);
  
      toast.success("Document uploaded successfully!");
  
      
      await addDoc(collection(db, "orders"), {
        sourceLanguage: sourceLang.value,
        targetLanguage: targetLang.value,
        pageCount: pages,
        estimatedCost: pages * COST, 
        documentLink: downloadURL, 
        clientId: currentUser.uid, 
        clientName: userData.name,
        clientEmail: currentUser.email,
        status: "Pending",
        translatorName: "Unassigned",
        translator:"Unassigned"
      });
  
      toast.success("Order placed successfully!");
      handlePopupClose(); 
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  const ProgressBar = () => {
    const progressPercentage = (currentStep / 3) * 100;
    return (
      <div className="w-full bg-gray-200 h-2 rounded-lg mt-4 mb-8">
        <div
          className="bg-pink-500 h-2 rounded-lg"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    );
  };

  if (!popupVisible) return null;

  return (
    <div className="container mx-auto p-4 max-w-md border rounded-lg shadow-lg bg-white">
      <ProgressBar />

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="loader">
            <FaSpinner className="animate-spin" />
          </div>
        </div>
      )}

      {!isLoading && currentStep === 1 && (
        <div>
          <h1 className="text-3xl font-bold mb-4">Upload Document</h1>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf, .docx, .doc, .txt, .rtf, .odt, .wps, .html, .htm, .md, .xml, .csv, .epub, .tex"
            required
          />
          <button
            onClick={() => setCurrentStep(2)}
            className="bg-pink-500 text-white p-2 rounded mt-4 w-full"
          >
            Next
          </button>
          <button
            onClick={handlePopupClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}

      {!isLoading && currentStep === 2 && (
        <div>
          <h1 className="text-3xl font-bold mb-4">Select Languages & Pages</h1>
          <div className="mb-4">
            <label>Source Language</label>
            <CreatableSelect
              options={languageOptions}
              onChange={handleSourceLangChange}
              placeholder="Source Language"
            />
          </div>
          <div className="mb-4">
            <label>Target Language</label>
            <CreatableSelect
              options={languageOptions}
              onChange={handleTargetLangChange}
              placeholder="Target Language"
            />
          </div>
          <div className="mb-4">
            <label>Number of Pages</label>
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter number of pages"
              required
            />
          </div>
          <button
            onClick={() => {
              setEstimatedCost(pages * 2); // Calculate estimated cost
              setCurrentStep(3);
            }}
            className="bg-pink-500 text-white p-2 rounded w-full"
          >
            Next
          </button>
          <button
            onClick={handlePopupClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}

      {!isLoading && currentStep === 3 && (
        <div>
          <h1 className="text-3xl font-bold mb-4">Cost Estimate</h1>
          <p>Pages: {pages}</p>
          <p>Estimated Cost: ${estimatedCost}</p>
          <button
            onClick={handlePayNow}
            className="bg-green-500 text-white p-2 rounded w-full mt-4"
          >
            Pay Now
          </button>
          <button
            onClick={handlePopupClose}
            className="mt-4 bg-gray-500 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;
