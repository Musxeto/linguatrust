import React from 'react';

const UpdateStatusModal = ({ isOpen, onClose, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = React.useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = () => {
    onUpdateStatus(selectedStatus);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-lg font-bold mb-2">Update Order Status</h2>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
