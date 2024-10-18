import React from "react";
import { FiMessageCircle } from "react-icons/fi";

const OrdersList = ({ orders, handleCardClick }) => {
  return (
    <div className="flex overflow-x-auto space-x-4 mb-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-customWhite shadow-2xl rounded-lg p-4 cursor-pointer border border-customPink hover:bg-pink-100 transition-all transition-duration-1000"
          onClick={() => handleCardClick(order)}
        >
          <h2 className="font-semibold">
            {order.sourceLanguage} to {order.targetLanguage}
          </h2>
          <p>Status: {order.status}</p>
          <p>Assigned to: {order.translatorName}</p>
          {order.translatorName !== "Unassigned" && (
            <button className="mt-2 bg-customBlack text-center w-full text-white p-2 rounded-[6px]">
              <a
                href={`/client/order/${order.id}/chat`}
                className="text-white flex items-center justify-center gap-2"
              >
                <FiMessageCircle size={16} /> Chat
              </a>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
