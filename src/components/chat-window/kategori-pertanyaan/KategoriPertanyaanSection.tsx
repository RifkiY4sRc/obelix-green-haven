import { Send, Bot, User, Grid2X2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { sendMessage } from "@/services/chatService";
import { getOrCreateGuestId } from "@/utils/guestId";

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
    timestamp: string;
}

const KategoriPertanyaanSection = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [guestId, setGuestId] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const categories = [
        { id: 0, label: "Reservasi" },
        { id: 1, label: "Tiket" },
        { id: 2, label: "Fasilitas" },
        { id: 3, label: "Event" },
    ];

    // Initialize guest ID
    useEffect(() => {
        const id = getOrCreateGuestId();
        setGuestId(id);
    }, []);

    // Set welcome message when category changes
    useEffect(() => {
        const categoryLabel = categories[activeCategory].label;
        setMessages([
            {
                id: 1,
                text: `Halo! Anda memilih kategori ${categoryLabel}. Silahkan tanyakan apa saja seputar ${categoryLabel}.`,
                sender: "bot",
                timestamp: new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            },
        ]);
    }, [activeCategory]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isTyping) return;

        const categoryLabel = categories[activeCategory].label;
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
            // Add category prefix to the message
            const messageWithCategory = `${categoryLabel}, ${messageText}`;
            const botResponseText = await sendMessage(messageWithCategory, guestId);

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
            {/* Header */}
            <div className="bg-gradient-to-r from-[#f0fdf4] to-[#f0fdf4] border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00c74f] rounded-full flex items-center justify-center">
                        <Grid2X2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">Kategori Pertanyaan</h2>
                        <p className="text-xs text-[#00c74f]">Pilih kategori untuk melihat pertanyaan umum</p>
                    </div>
                </div>
            </div>

            {/* Category Buttons */}
            <div className="px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex justify-between gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm transition-all ${activeCategory === category.id
                                    ? "bg-[#f0fdf4] text-[#00c74f] font-bold shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium"
                                }`}
                        >
                            <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center ${activeCategory === category.id ? "bg-[#00c74f]" : "bg-gray-400"
                                    }`}
                            >
                                <Bot className="w-3 h-3 text-white" />
                            </div>
                            {category.label}
                        </button>
                    ))}
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

export default KategoriPertanyaanSection;
