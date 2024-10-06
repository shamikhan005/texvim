'use client';

import { useState, useRef, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md h-[600px] flex flex-col border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
          <h1 className="text-xl font-bold">texvim</h1>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    index % 2 === 0
                      ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white'
                      : 'bg-gradient-to-r from-white to-gray-100 text-black shadow-md'
                  }`}
                >
                  {msg}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 bg-white border-t border-gray-300">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:bg-gradient-to-r hover:from-white hover:to-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}