import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BsSendFill } from "react-icons/bs";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the global chat!", sender: "System", time: "10:23 AM" },
    { id: 2, text: "Hello everyone!", sender: "Alice", time: "10:24 AM" },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="w-full h-[100vh] bg-[#0A1A2F] flex flex-col text-white">

      {/* TOP BAR */}
      <header className="w-full py-4 px-8 border-b border-white/10 bg-[#0A1A2F]/80 backdrop-blur-xl flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-wide">🌍 Global Chat</h2>
      </header>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        {/* DATE SEPARATOR */}
        <div className="flex justify-center">
          <span className="text-xs text-white/40 bg-white/10 px-4 py-1 rounded-full">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-md 
              ${msg.sender === "You"
                ? "bg-white text-[#0A1A2F] rounded-br-none"
                : msg.sender === "System"
                ? "bg-transparent text-white/60 italic"
                : "bg-[#102540] text-white rounded-bl-none"
              }`
            }>
              <p className="text-xs font-semibold opacity-70 mb-1">{msg.sender}</p>
              <p className="text-sm">{msg.text}</p>
              <span className="mt-1 text-[10px] block opacity-60 text-right">{msg.time}</span>
            </div>
          </motion.div>
        ))}

        {/* TYPING INDICATOR */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 bg-[#102540] rounded-2xl flex gap-1">
              <motion.span
                className="w-2 h-2 bg-white/70 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              />
              <motion.span
                className="w-2 h-2 bg-white/70 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ delay: 0.2, repeat: Infinity, duration: 0.6 }}
              />
              <motion.span
                className="w-2 h-2 bg-white/70 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ delay: 0.4, repeat: Infinity, duration: 0.6 }}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="w-full p-5 bg-white flex items-center gap-4 shadow-inner">

        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 1200);
          }}
          type="text"
          placeholder="Type your message..."
          className="w-full py-3 px-4 text-[#0A1A2F] bg-white/90 border border-[#0A1A2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A1A2F]"
        />

        <button
          onClick={sendMessage}
          className="p-3 rounded-xl bg-[#1f3f6b] text-white hover:bg-[#0d2342] transition shadow-md"
        >
          <BsSendFill size={18} />
        </button>

      </div>
    </div>
  );
};

export default Chat;
