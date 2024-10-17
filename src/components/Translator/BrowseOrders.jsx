import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import OrdersList from './OrdersList';

const BrowseOrders = () => {
  const [unassignedOrders, setUnassignedOrders] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUnassignedOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("translatorId", "==", null) // Assuming null means unassigned
      );
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const orderList = [];
          querySnapshot.forEach((doc) => {
            orderList.push({ id: doc.id, ...doc.data() });
          });
          setUnassignedOrders(orderList);
        },
        (error) => {
          toast.error("Failed to fetch orders: " + error.message);
        }
      );
      return unsubscribe;
    };

    fetchUnassignedOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container px-4">
        <h1 className="text-3xl font-bold mb-4">Browse Unassigned Orders</h1>
        <OrdersList orders={unassignedOrders} />
      </div>
    </>
  );
};

export default BrowseOrders;