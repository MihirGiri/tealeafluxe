import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User, Loader } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! Welcome to Swadistchai. How can I help you today? You can ask me to 'track order' or 'suggest tea'.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [awaitingOrderNumber, setAwaitingOrderNumber] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const lowercaseInput = userMessage.text.toLowerCase();

    // Process user input
    setTimeout(async () => {
      let botResponse = { id: Date.now() + 1, sender: "bot", text: "" };

      if (awaitingOrderNumber) {
        // Assume user entered an order number
        setAwaitingOrderNumber(false);
        try {
          const response = await fetch("https://swadistchai.onrender.com/api/orders/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderNumber: userMessage.text.trim() }),
          });
          const data = await response.json();

          if (data.success) {
            botResponse.text = `Order ${data.order.orderNumber} is currently **${data.order.status}**.\n\nItems: ${data.order.items}\nTotal: ₹${data.order.total.toLocaleString("en-IN")}`;
          } else {
            botResponse.text = "I couldn't find an order with that number. Please check and try asking to 'track order' again.";
          }
        } catch (error) {
          botResponse.text = "Sorry, I'm having trouble connecting to the tracking system right now.";
        }
      } else if (lowercaseInput.includes("track") || lowercaseInput.includes("order status")) {
        botResponse.text = "Sure! Please enter your Order Number (e.g., ORD-2024...).";
        setAwaitingOrderNumber(true);
      } else if (lowercaseInput.includes("suggest") || lowercaseInput.includes("recommend")) {
        if (lowercaseInput.includes("sleep") || lowercaseInput.includes("relax")) {
          botResponse.text = "For relaxation and sleep, I highly recommend our **Chamomile Herbal Tea** or **Lavender Blend**.";
        } else if (lowercaseInput.includes("energy") || lowercaseInput.includes("morning")) {
          botResponse.text = "Need an energy boost? Try our **Premium Matcha** or **Assam Black Tea**!";
        } else if (lowercaseInput.includes("health") || lowercaseInput.includes("weight")) {
          botResponse.text = "For health and metabolism, our **Imperial Jade Green Tea** is perfect.";
        } else {
          botResponse.text = "We have many great teas! Are you looking for something for energy, relaxation, or health benefits?";
        }
      } else if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi")) {
        botResponse.text = "Hello! How can I assist you with your tea journey today?";
      } else {
        botResponse.text = "I'm a simple bot. I can help you track your order or suggest a tea based on your needs (e.g., energy, sleep, health). Try asking 'suggest tea for sleep'.";
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-colors ${
          isOpen ? "bg-amber-600 scale-0 opacity-0 pointer-events-none" : "bg-amber-600 hover:bg-amber-700 text-white"
        }`}
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200 flex flex-col"
            style={{ height: "500px", maxHeight: "80vh" }}
          >
            {/* Header */}
            <div className="bg-amber-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <div>
                  <h3 className="font-bold text-sm">Swadistchai Assistant</h3>
                  <p className="text-amber-100 text-xs">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-amber-700 p-1 rounded transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={16} className="text-amber-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-amber-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm whitespace-pre-wrap"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={16} className="text-amber-600" />
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-gray-100 border-transparent focus:bg-white border focus:border-amber-500 rounded-full text-sm outline-none transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Send size={16} className="ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
