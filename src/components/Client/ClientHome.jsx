import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "./Navbar";
import UploadDocument from "./UploadDocument";
import OrdersList from "./OrdersList";
import { FiUpload } from "react-icons/fi";
import OrderDetailsModal from "../OrderDetailsModal";
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
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Navbar />
      <div className="container px-4">
        <h1 className="text-3xl font-bold mb-4">
          Welcome,{" "}
          <span className="text-customPink">{userData.name.toUpperCase()}</span>
          !
        </h1>

        <button
          onClick={() => setPopupVisible(true)}
          className="bg-customPink text-customWhite px-4 py-2 rounded mb-4 flex items-center gap-2"
        >
          <FiUpload size={20} /> New Order
        </button>

        <OrdersList orders={orders} handleCardClick={handleCardClick} />

        {popupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-customBlack bg-opacity-50">
            <UploadDocument closePopup={handlePopupClose} />
          </div>
        )}

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

export default ClientHome;
