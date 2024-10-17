import React, { useEffect } from 'react'; 
import { toast } from 'react-toastify';

const UnAssignedOrdersList = ({ orders, onSelectOrder }) => {
  return (
    <div>
      <ul className="space-y-4">
        {orders.length === 0 ? (
          <p>No unassigned orders found.</p>
        ) : (
          orders.map(order => (
            <li key={order.id} className="border p-4 rounded shadow flex justify-between items-center">
              <div>
                <p><strong>Client:</strong> {order.clientName}</p>
                <p><strong>Source Language:</strong> {order.sourceLanguage}</p>
                <p><strong>Target Language:</strong> {order.targetLanguage}</p>
                <p><strong>Estimated Cost:</strong> ${order.estimatedCost}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
              <button
                onClick={() => {
                  onSelectOrder(order);
                  toast.success("Order selected!");
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Select Order
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UnAssignedOrdersList;
