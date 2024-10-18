// OrdersList.jsx
import React, { useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import UpdateStatusModal from './UpdateStatusModal';

const OrdersList = ({ orders, handleCardClick, handleUpdateOrderStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleStatusUpdate = (status) => {
    if (selectedOrderId) {
      handleUpdateOrderStatus(selectedOrderId, status); // Call the update status function
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-4">
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders available.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-customWhite shadow-lg rounded-lg p-4 cursor-pointer border border-customPink hover:bg-pink-100 transition-all transition-duration-1000"
            onClick={() => handleCardClick(order)}
          >
            <h2 className="font-semibold">
              {order.sourceLanguage} to {order.targetLanguage}
            </h2>
            <p>Status: {order.status}</p>
            <p>Client: {order.clientName}</p>
            <a
              href={`/translator/order/${order.id}/chat`}
              className="text-customPink mt-2 flex items-center gap-2"
            >
              <FiMessageCircle size={16} /> Chat
            </a>
            <button
              onClick={() => openModal(order.id)} // Open the modal
              className="mt-2 bg-customPink text-white p-2 rounded"
            >
              Update Status
            </button>
          </div>
        ))
      )}
      {/* Modal for updating order status */}
      <UpdateStatusModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpdateStatus={handleStatusUpdate} // Pass the status update handler
      />
    </div>
  );
};

export default OrdersList;
