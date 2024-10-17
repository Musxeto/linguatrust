import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "./Navbar";
import UploadDocument from "./UploadDocument"; // Import your UploadDocument component

const ClientHome = () => {
  const [orders, setOrders] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("clientId", "==", currentUser.uid)
      );
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const orderList = [];
          querySnapshot.forEach((doc) => {
            orderList.push({ id: doc.id, ...doc.data() });
          });
          setOrders(orderList);
        },
        (error) => {
          toast.error("Failed to fetch orders: " + error.message);
        }
      );
      return unsubscribe;
    };

    fetchOrders();
  }, [currentUser.uid]);

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Navbar />
      <div className="container px-4">
        <h1 className="text-3xl font-bold mb-4">Welcome, {userData.name}!</h1>
        {/* Open Upload Document Popup */}
        <button
          onClick={() => setPopupVisible(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          New Order
        </button>

        {/* Orders Section */}
        <div className="flex overflow-x-auto space-x-4 mb-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => handleCardClick(order)}
            >
              <h2 className="font-semibold">
                {order.sourceLanguage} to {order.targetLanguage}
              </h2>
              <p>Status: {order.status}</p>
              <p>Assigned to: {order.translatorName}</p>
              <a
                href={`/order/${order.id}/chat`}
                className="text-blue-500 block mt-2"
              >
                Chat
              </a>
            </div>
          ))}
        </div>

        {/* Popup for Upload Document */}
        {popupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <UploadDocument closePopup={handlePopupClose} />{" "}
            {/* Pass close function as prop */}
          </div>
        )}

        {/* Popup for Order Details */}
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold mb-2">
                {selectedOrder.sourceLanguage} to {selectedOrder.targetLanguage}
              </h2>
              <p>Status: {selectedOrder.status}</p>
              <p>Assigned to: {selectedOrder.translatorName}</p>
              <p>
                Document Link:{" "}
                <a
                  href={selectedOrder.documentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {selectedOrder.documentLink}
                </a>
              </p>
              <button
                onClick={handlePopupClose}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientHome;
