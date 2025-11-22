import React, { useState, useEffect, useRef } from "react";
import BOT_AVATAR from "../assets/Chatbot.png";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "नमस्ते! 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to last message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  // Voice recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    setRecognitionSupported(true);

    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.interimResults = false;

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + text : text));
    };

    rec.onend = () => setListening(false);

    recognitionRef.current = rec;
  }, []);

  // API call
  const callModel = async (conversation) => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: conversation,
          }),
        }
      );

      const data = await res.json();

      const reply =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I didn’t understand that.";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error! Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send text
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { sender: "user", text: trimmed };

    setMessages((prev) => {
      const updatedChat = [...prev, userMessage];

      const modelMessages = [
        {
          role: "system",
          content:
            "You are a helpful bilingual chatbot that understands Hindi and English.",
        },
        ...updatedChat.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
      ];

      callModel(modelMessages);

      return updatedChat;
    });

    setInput("");
  };

  // Voice toggle
  const toggleListen = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  // Reset chat
  const clearChat = () => {
    setMessages([{ sender: "bot", text: "नमस्ते! 👋 How can I help you today?" }]);
  };

  return (
    <>
      {/* Floating Icon in bottom-right FIXED */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {open && (
          <button
            onClick={() => {
              clearChat();
              setOpen(false);
            }}
            className="mb-2 bg-white/90 text-gray-700 px-3 py-2 rounded-lg shadow"
          >
            Clear & Close
          </button>
        )}

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0046FF] to-[#001BB7] text-white text-2xl shadow-xl hover:scale-110 transition"
        >
          {open ? "✕" : "💬"}
        </button>
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-28 right-6 z-[9999] w-96 max-h-[70vh] bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-300 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#0046FF] to-[#001BB7] text-white">
            <img
              src={BOT_AVATAR}
              alt="bot"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div className="flex-1">
              <div className="font-bold text-lg">Chatbot</div>
              <div className="text-xs opacity-90">Ask in English or Hindi</div>
            </div>

            {recognitionSupported && (
              <button
                onClick={toggleListen}
                className={`p-2 bg-white/20 rounded ${
                  listening ? "ring-2 ring-white" : ""
                }`}
              >
                {listening ? "🎤" : "🎙️"}
              </button>
            )}

            <button onClick={clearChat} className="p-2 bg-white/20 rounded">
              🧹
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] ${
                  m.sender === "user" ? "ml-auto text-right" : "mr-auto"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 text-sm italic">Typing...</div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white/90 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 rounded-xl border"
              placeholder="Type message..."
            />

            <button
              onClick={handleSend}
              className="px-4 py-2 bg-gradient-to-br from-[#0046FF] to-[#001BB7] text-white rounded-xl"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
