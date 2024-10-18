import React,{useState} from "react";

const FileUploadModal = ({ isOpen, onClose, onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
      setFile(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-lg font-bold mb-2">Upload File</h2>
        <input type="file" onChange={handleFileChange} />
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded">
            Cancel
          </button>
          <button onClick={handleUpload} className="bg-green-500 text-white p-2 rounded">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
