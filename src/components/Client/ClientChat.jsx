import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';

const ClientChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [document, setDocument] = useState(null);
  const orderId = '123'; 

  const handleSendMessage = () => {
    if (messageInput.trim() === "" && !document) {
      toast.error("Please enter a message or upload a document.");
      return;
    }

    const newMessage = {
      text: messageInput,
      document,
      timestamp: new Date(),
    };

    // TODO: Send message to the server here

    setMessages([...messages, newMessage]);
    setMessageInput("");
    setDocument(null);
    toast.success("Message sent!");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-customWhite">
      <div className="sticky top-0 bg-customWhite z-10 p-4 border-b">
        <h1 className="text-xl font-bold">Order #{orderId} (X lang to Y lang)</h1>
        {document && (
          <iframe 
            src={URL.createObjectURL(document)} 
            className="w-full h-32 border mt-2" 
            title="Document Preview"
          />
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-2 flex-col-reverse">
        {messages.reverse().map((msg, index) => (
          <div key={index} className="mb-2">
            <div className={`p-2 rounded ${msg.document ? "bg-gray-200" : "bg-customPink"}`}>
              {msg.text && <p>{msg.text}</p>}
              {msg.document && <p className="text-sm text-gray-500">Document uploaded</p>}
            </div>
          </div>
        ))}
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
