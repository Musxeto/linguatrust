// OrdersList.jsx
import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';

const OrdersList = ({ orders, handleCardClick }) => {
  return (
    <div className="flex flex-col space-y-4 mb-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-customWhite shadow-lg rounded-lg p-4 cursor-pointer border border-customPink hover:bg-pink-100 transition-all transition-duration-1000"
          onClick={() => handleCardClick(order)}
        >
          <h2 className="font-semibold">
            {order.sourceLanguage} to {order.targetLanguage}
          </h2>
          <p>Status: {order.status}</p>
          <p>Customer: {order.customerName}</p>
          <a
            href={`/order/${order.id}/chat`}
            className="text-customPink mt-2 flex items-center gap-2"
          >
            <FiMessageCircle size={16} /> Chat
          </a>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;