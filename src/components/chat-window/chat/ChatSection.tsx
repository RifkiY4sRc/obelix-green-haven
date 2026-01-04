import { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import { sendMessage } from "@/services/chatService";
import { getOrCreateGuestId } from "@/utils/guestId";

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
    timestamp: string;
}

const ChatSection = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [guestId, setGuestId] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize guest ID and welcome message
    useEffect(() => {
        const id = getOrCreateGuestId();
        setGuestId(id);

        // Set welcome message
        setMessages([
            {
                id: 1,
                text: "Halo! Saya asisten Obelix Village. Saya di sini untuk membantu anda memberikan informasi yang Anda ingin ketahui seputar Obelix Village. Ada yang bisa saya bantu?",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            },
        ]);
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isTyping) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text: inputMessage,
            sender: "user",
            timestamp: new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages((prev) => [...prev, userMessage]);
        const messageText = inputMessage;
        setInputMessage("");
        setIsTyping(true);

        try {
            const botResponseText = await sendMessage(messageText, guestId);
            const botMessage: Message = {
                id: messages.length + 2,
                text: botResponseText,
                sender: "bot",
                timestamp: new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error in sendMessage:", error);
            const errorMessage: Message = {
                id: messages.length + 2,
                text: error instanceof Error ? error.message : "Maaf, terjadi kesalahan. Silakan coba lagi.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            {/* Chat Header with Online Status */}
            <div className="bg-gradient-to-r from-[#f0fdf4] to-[#f0fdf4] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00c74f] rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">ChatBot Assistant</h2>
                        <p className="text-xs text-[#00c74f]">AI Assistant for Obelix Village</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#00c74f] rounded-full animate-pulse"></div>
                    <span className="text-sm text-[#00c74f] font-medium">Online</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className="flex items-start gap-3 max-w-[70%]">
                            {message.sender === "bot" && (
                                <div className="w-8 h-8 bg-[#00c74f] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <div>
                                <div
                                    className={`rounded-2xl px-4 py-3 ${message.sender === "bot"
                                            ? "bg-[#f0fdf4] text-gray-800"
                                            : "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 px-2">{message.timestamp}</p>
                            </div>
                            {message.sender === "user" && (
                                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex items-start gap-3 max-w-[70%]">
                            <div className="w-8 h-8 bg-[#00c74f] rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-[#f0fdf4] rounded-2xl px-4 py-3">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-[#00c74f] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                    <div className="w-2 h-2 bg-[#00c74f] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                    <div className="w-2 h-2 bg-[#00c74f] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Ketik Pesan Anda..."
                        disabled={isTyping}
                        className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c74f] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        className="bg-[#00c74f] hover:bg-[#00b045] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
