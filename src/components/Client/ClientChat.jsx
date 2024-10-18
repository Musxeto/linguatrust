import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPaperPlane } from "react-icons/fa";
import { realdb, db } from "../../firebase"; // Firebase Realtime DB & Firestore
import { ref, onValue, update } from "firebase/database";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Navbar from "./Navbar";
import { ClipLoader } from "react-spinners";

const ClientChat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesRef = ref(realdb, `orders/${id}/messages`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = () => {
      const unsubscribeMessages = onValue(
        messagesRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setMessages(Object.values(data));
          }
          setLoadingMessages(false);
          scrollToBottom();
        },
        (error) => {
          toast.error("Failed to fetch messages: " + error.message);
          setLoadingMessages(false);
        }
      );

      return () => {
        unsubscribeMessages();
      };
    };

    fetchMessages();
  }, [id, messagesRef]);

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
  }, [id]);
  const handleSendMessage = () => {
    if (messageInput.trim() === "") {
      toast.error("Please enter a message.");
      return;
    }

    const newMessage = {
      text: messageInput,
      sender: "client",
      timestamp: Date.now(),
    };

    update(messagesRef, {
      [newMessage.timestamp]: newMessage,
    });

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
    scrollToBottom();
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-customWhite">
        <Navbar />
        <div className="sticky top-0 shadow-lg bg-customWhite z-10 p-4 border-b">
          {loadingOrder ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader size={50} color={"#000"} loading={loadingOrder} />
            </div>
          ) : (
            order && (
              <>
                <h1 className="text-xl font-bold md:text-2xl">
                  Order - {order.sourceLanguage} to {order.targetLanguage}
                </h1>
                <h2 className="text-lg font-bold">
                  Translator:{" "}
                  <span className="text-customPink">
                    {order.translatorName}
                  </span>
                </h2>
                <iframe
                  title="PDF Viewer"
                  src={order.documentLink}
                  width="100%"
                  height="150"
                  className="border-none"
                />
              </>
            )
          )}
        </div>
        <div className="message-container flex-1 overflow-y-auto p-4 md:p-2">
          {loadingMessages ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader size={50} color={"#000"} loading={loadingMessages} />
            </div>
          ) : (
            <div>
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <div
                    className={`p-2 rounded ${
                      msg.sender === "client" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {msg.text && <p>{msg.text}</p>}
                    {msg.fileUrl && (
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-customPink underline"
                      >
                        {msg.fileName}
                      </a>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        <div className="flex items-center mt-4 space-x-2 p-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message"
            className="border border-gray-300 p-2 flex-grow rounded-md focus:outline-none focus:ring focus:ring-customPink"
          />
          <button
            onClick={handleSendMessage}
            className="bg-customPink text-white p-2 rounded-md flex items-center"
          >
            <FaPaperPlane />
            <span className="ml-2">Send</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ClientChat;
