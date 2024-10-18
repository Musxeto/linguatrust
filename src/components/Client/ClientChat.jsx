import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPaperPlane, FaSpinner, FaFileDownload } from "react-icons/fa";
import { realdb, db, storage } from "../../firebase";
import { ref, onValue, update } from "firebase/database";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import OrdersList from './OrdersList'
import { getDownloadURL, ref as storageRef } from "firebase/storage";

const ClientChat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [file, setFile] = useState(null);
  const [order, setOrder] = useState({});
  const [loadingOrder, setLoadingOrder] = useState(true); // Track loading state for order
  const [loadingMessages, setLoadingMessages] = useState(true); // Track loading state for messages

  const messagesEndRef = useRef(null); // Ref for automatically scrolling to the bottom
  const messagesRef = ref(realdb, `orders/${id}/messages`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Separate useEffect for fetching the order details
  useEffect(() => {
    const fetchOrder = async () => {
      setLoadingOrder(true);
      const q = query(collection(db, "orders"), where("id", "==", id));
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const orderData = [];
          querySnapshot.forEach((doc) => {
            orderData.push({ id: doc.id, ...doc.data() });
          });
          setOrder(orderData[0]);
          setLoadingOrder(false);
        },
        (error) => {
          toast.error("Failed to fetch order: " + error.message);
          setLoadingOrder(false);
        }
      );
      return unsubscribe;
    };

    fetchOrder();
  }, [id]); // Only run when 'id' changes

  // Separate useEffect for listening to real-time messages
  useEffect(() => {
    const unsubscribeMessages = onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(Object.values(data));
        }
        setLoadingMessages(false); // Set loading to false after receiving messages
        scrollToBottom(); // Scroll to the bottom after new messages are loaded
      },
      (error) => {
        toast.error("Failed to fetch messages: " + error.message);
        setLoadingMessages(false); // Set loading to false if there's an error
      }
    );

    return () => {
      unsubscribeMessages();
    };
  }, [messagesRef]); // Only run when 'messagesRef' changes

  const handleSendMessage = async () => {
    if (messageInput.trim() === "" && !file) {
      toast.error("Please enter a message or upload a file.");
      return;
    }

    const newMessage = {
      text: messageInput,
      timestamp: Date.now(), // Use Date.now() for Firebase-compliant key
    };

    if (file) {
      const fileRef = storageRef(storage, `documents/${id}/${file.name}`);
      await fileRef.put(file);
      newMessage.document = await getDownloadURL(fileRef); // Add download link
    }

    // Update the message in the real-time database
    update(messagesRef, {
      [newMessage.timestamp]: newMessage,
    });

    setMessages((prev) => [...prev, newMessage]); // Add message to state
    setMessageInput("");
    setFile(null); // Clear file input
    scrollToBottom(); // Scroll to the bottom after sending a message
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-customWhite">
      <div className="sticky top-0 shadow-lg bg-customWhite z-10 p-4 border-b">
        <h1 className="text-xl font-bold">
          Order - {order.sourceLanguage} to {order.targetLanguage}
        </h1>
        <h2 className="text-lg font-bold"> Translator: <span className="text-customPink">{order.translatorName}</span></h2>
        {loadingOrder ? (
          <div className="flex justify-center shadow-lg items-center h-64">
            <ClipLoader size={50} color={"#000"} loading={loadingOrder} />
          </div>
        ) : (
          <iframe
            title="PDF Viewer"
            src={order.documentLink}
            width="100%"
            height="150px"
            className="border-none"
            onLoad={() => setLoading(false)} // Set loading to false when the document is loaded
          />
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {loadingMessages ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader size={50} color={"#000"} loading={loadingMessages} />
          </div>
        ) : (
          <div>
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <div className={`p-2 rounded ${msg.document ? "bg-gray-200" : "bg-customPink"}`}>
                  {msg.text && <p>{msg.text}</p>}
                  {msg.document && (
                    <a
                      href={msg.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      <FaFileDownload /> Download
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Ref to automatically scroll to bottom */}
          </div>
        )}
      </div>
      <div className="flex items-center mt-4 space-x-2 flex-wrap">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-customPink text-white rounded flex items-center"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ClientChat;
