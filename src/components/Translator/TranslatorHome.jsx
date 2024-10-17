import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "./Navbar";
import OrdersList from "./OrdersList";
import OrderDetailsModal from "../OrderDetailsModal";

const TranslatorHome = () => {
  const [orders, setOrders] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("translatorId", "==", currentUser.uid) // Assuming you store the translator ID here
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
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Navbar />
      <div className="container px-4">
        <h1 className="text-3xl font-bold mb-4">Your Current Orders</h1>
        <OrdersList orders={orders} handleCardClick={handleCardClick} />

        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            closeModal={handlePopupClose}
          />
        )}
      </div>
    </>
  );
};

export default TranslatorHome;
