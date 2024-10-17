import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "./Navbar";
import UnAssignedList from "./UnAssignedList";
import { ClipLoader } from "react-spinners";
import UnassignedOrderDetailsModal from "./UnassignedOrderDetailsModal";
import { updateDoc,addDoc,doc } from "firebase/firestore";
const languageOptions = [
  { label: "English", value: "English" },
  { label: "Urdu", value: "Urdu" },
  { label: "Spanish", value: "Spanish" },
  { label: "Mandarin Chinese", value: "Mandarin Chinese" },
  { label: "Hindi", value: "Hindi" },
  { label: "French", value: "French" },
  { label: "Arabic", value: "Arabic" },
  { label: "Bengali", value: "Bengali" },
  { label: "Portuguese", value: "Portuguese" },
  { label: "Russian", value: "Russian" },
  { label: "Japanese", value: "Japanese" },
  { label: "Punjabi", value: "Punjabi" },
  { label: "German", value: "German" },
  { label: "Korean", value: "Korean" },
  { label: "Vietnamese", value: "Vietnamese" },
  { label: "Italian", value: "Italian" },
  { label: "Turkish", value: "Turkish" },
  { label: "Persian", value: "Persian" },
  { label: "Polish", value: "Polish" },
  { label: "Dutch", value: "Dutch" },
  { label: "Swedish", value: "Swedish" },
  { label: "Greek", value: "Greek" },
  { label: "Czech", value: "Czech" },
  { label: "Hungarian", value: "Hungarian" },
  { label: "Thai", value: "Thai" },
  { label: "Hebrew", value: "Hebrew" },
  { label: "Romanian", value: "Romanian" },
  { label: "Indonesian", value: "Indonesian" },
  { label: "Ukrainian", value: "Ukrainian" },
  { label: "Malay", value: "Malay" },
  { label: "Finnish", value: "Finnish" },
  { label: "Norwegian", value: "Norwegian" },
  { label: "Danish", value: "Danish" },
  { label: "Serbian", value: "Serbian" },
  { label: "Croatian", value: "Croatian" },
  { label: "Bulgarian", value: "Bulgarian" },
  { label: "Slovak", value: "Slovak" },
  { label: "Slovenian", value: "Slovenian" },
  { label: "Lithuanian", value: "Lithuanian" },
  { label: "Latvian", value: "Latvian" },
  { label: "Estonian", value: "Estonian" },
  { label: "Icelandic", value: "Icelandic" },
  { label: "Maltese", value: "Maltese" },
  { label: "Welsh", value: "Welsh" },
  { label: "Irish", value: "Irish" },
  { label: "Scottish Gaelic", value: "Scottish Gaelic" },
  { label: "Afrikaans", value: "Afrikaans" },
  { label: "Swahili", value: "Swahili" },
  { label: "Zulu", value: "Zulu" },
  { label: "Xhosa", value: "Xhosa" },
];

const BrowseOrders = () => {
  const [unassignedOrders, setUnassignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sourceLang, setSourceLang] = useState(null); // State for source language
  const [targetLang, setTargetLang] = useState(null); // State for target language
  const { currentUser } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchUnassignedOrders = async () => {
      setLoading(true);
      const q = query(
        collection(db, "orders"),
        where("translator", "==", "Unassigned")
      );
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const orderList = [];
          querySnapshot.forEach((doc) => {
            orderList.push({ id: doc.id, ...doc.data() });
          });
          setUnassignedOrders(orderList);
          setLoading(false);
        },
        (error) => {
          toast.error("Failed to fetch orders: " + error.message);
          setLoading(false);
        }
      );
      return unsubscribe;
    };

    fetchUnassignedOrders();
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
    setSourceLang(null);
    setTargetLang(null);
  };

  const confirmSelection = async () => {
    if (selectedOrder) {
      const updatedOrder = {
        ...selectedOrder,
        translator: currentUser.email, // Assuming the translator is the current user
        translatorName: currentUser.displayName, // Assuming the display name is available
      };

      try {
        await updateDoc(doc(db, "orders", selectedOrder.id), updatedOrder);
        toast.success("Order updated successfully!");
        closeModal(); // Close modal after update
      } catch (error) {
        toast.error("Failed to update order: " + error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container px-4">
        <h1 className="text-3xl font-bold mb-4">Browse Unassigned Orders</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader size={50} color={"#000"} loading={loading} />
          </div>
        ) : (
          <UnAssignedList
            orders={unassignedOrders}
            onSelectOrder={handleSelectOrder}
          />
        )}
        <UnassignedOrderDetailsModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          order={selectedOrder}
          sourceLang={sourceLang}
          targetLang={targetLang}
          setSourceLang={setSourceLang}
          setTargetLang={setTargetLang}
          onConfirmSelection={confirmSelection}
        />
      </div>
    </>
  );
};

export default BrowseOrders;
