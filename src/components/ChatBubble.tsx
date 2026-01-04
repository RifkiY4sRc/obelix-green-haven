import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./chat-window/ChatWindow";

const ChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Chat Window */}
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group ${isOpen ? "bg-red-500 hover:bg-red-600 rotate-0 z-40" : "bg-emerald-500 hover:bg-emerald-600 hover:scale-110 z-50"
                    }`}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-white transition-transform group-hover:rotate-90 duration-300" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-white animate-pulse" />
                )}
            </button>

            {/* Notification Badge (optional) */}
            {!isOpen && (
                <div className="fixed bottom-20 right-6 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center z-50 animate-bounce">
                    1
                </div>
            )}
        </>
    );
};

export default ChatBubble;
