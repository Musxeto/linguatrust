import React, { useState } from "react";
import OrderFormModal from "./OrderFormModal"; // Modal for new orders
import { toast } from "react-toastify";

const ClientHome = () => {
  const [showModal, setShowModal] = useState(false);
  
  // Example data structure for records
  const records = [
    { id: 1, status: "In Progress", chat: true },
    { id: 2, status: "Completed", chat: true },
    // Add more records as needed
  ];

  const handleNewOrder = () => {
    setShowModal(true);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Your Records</h1>
      <button
        onClick={handleNewOrder}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        New Order
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {records.map((record) => (
          <div key={record.id} className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold">Record #{record.id}</h2>
            <p>Status: {record.status}</p>
            {record.chat && (
              <button className="mt-2 p-2 bg-green-500 text-white rounded">
                Open Chat
              </button>
            )}
          </div>
        ))}
      </div>

      <OrderFormModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default ClientHome;
