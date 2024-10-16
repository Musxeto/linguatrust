import React, { useState } from "react";

const TranslatorHome = () => {
  const [orders] = useState([
    { id: 1, status: "In Progress", chat: true },
    { id: 2, status: "Completed", chat: true },
    // Add more orders as needed
  ]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Your Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold">Order #{order.id}</h2>
            <p>Status: {order.status}</p>
            {order.chat && (
              <button className="mt-2 p-2 bg-green-500 text-white rounded">
                Open Chat
              </button>
            )}
            <button className="mt-2 p-2 bg-blue-500 text-white rounded">
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslatorHome;
