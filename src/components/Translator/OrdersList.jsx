import React, { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import UpdateStatusModal from "./UpdateStatusModal";

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
      handleUpdateOrderStatus(selectedOrderId, status);
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
            <button className="mt-2 bg-black text-center w-full text-white p-2 rounded">
              <a
                href={`/translator/order/${order.id}/chat`}
                className="text-white flex items-center justify-center gap-2"
              >
                <FiMessageCircle size={16} /> Chat
              </a>
            </button>

            <button
              onClick={() => openModal(order.id)} // Open the moda
              className="mt-2 bg-customPink text-center w-full text-white p-2 rounded"
            >
              Update Status
            </button>
          </div>
        ))
      )}

      <UpdateStatusModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpdateStatus={handleStatusUpdate}
      />
    </div>
  );
};

export default OrdersList;
