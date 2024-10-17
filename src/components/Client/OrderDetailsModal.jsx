import React from 'react';

const OrderDetails = ({ order }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="font-bold">{order.sourceLanguage} to {order.targetLanguage}</h2>
      <p>Status: {order.status}</p>
      <p>Assigned Translator: {order.translatorName}</p>
      <p>Document Link: <a href={order.documentLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Document</a></p>
      <p>Estimated Cost: ${order.estimatedCost}</p>
    </div>
  );
};

export default OrderDetails;
