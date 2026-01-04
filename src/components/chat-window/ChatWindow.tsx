import { useState } from "react";
import { Settings, MessageCircle, Star, Bug, BarChart3, HelpCircle, Grid2X2, Menu, X } from "lucide-react";
import ChatSection from "./chat/ChatSection";
import KategoriPertanyaanSection from "./kategori-pertanyaan/KategoriPertanyaanSection";
import WahanaFavoritSection from "./wahana-favorit/WahanaFavoritSection";
import LaporBugSection from "./lapor-bug/LaporBugSection";
import RatingSection from "./rating/RatingSection";
import BantuanSection from "./bantuan/BantuanSection";

interface ChatWindowProps {
    onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
    const [activeMenuItem, setActiveMenuItem] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { icon: MessageCircle, label: "Chat" },
        { icon: Grid2X2, label: "Kategori Pertanyaan" },
        { icon: Star, label: "Wahana Favorit" },
        { icon: Bug, label: "Lapor Bug" },
        { icon: BarChart3, label: "Rating" },
        { icon: HelpCircle, label: "Bantuan" },
    ];

    const renderSection = () => {
        switch (activeMenuItem) {
            case 0:
                return <ChatSection />;
            case 1:
                return <KategoriPertanyaanSection />;
            case 2:
                return <WahanaFavoritSection />;
            case 3:
                return <LaporBugSection />;
            case 4:
                return <RatingSection />;
            case 5:
                return <BantuanSection />;
            default:
                return <ChatSection />;
        }
    };

    const handleMenuItemClick = (index: number) => {
        setActiveMenuItem(index);
        setIsMobileMenuOpen(false); // Close mobile menu after selection
    };

    return (
        <div className="fixed bottom-20 md:bottom-24 left-4 right-4 md:left-auto md:right-6 mx-auto md:mx-0 max-w-full md:max-w-[960px] md:w-[960px] h-[calc(100vh-6rem)] md:h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-4 duration-300">
            {/* Full Width Header - ObelixSious */}
            <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00c74f] rounded-xl flex items-center justify-center text-white font-bold text-base md:text-lg">
                        O
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-base md:text-lg">ObelixSious</h3>
                        <p className="text-xs text-gray-500">AI Tourism Assistant</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* Hamburger Menu Button - Mobile Only */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600" />
                        )}
                    </button>
                    {/* Settings Button - Desktop Only */}
                    <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Content Area: Sidebar + Chat Section */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar - Desktop */}
                <div className="hidden md:block w-56 bg-white border-r border-gray-200 p-4">
                    <div className="space-y-2">
                        {menuItems.map((item, index) => {
                            const isActive = activeMenuItem === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveMenuItem(index)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${isActive
                                        ? "bg-[#00c74f] shadow-md"
                                        : "hover:bg-[#e6fce9]"
                                        }`}
                                >
                                    <item.icon
                                        className={`w-5 h-5 ${isActive
                                            ? "text-white"
                                            : "text-gray-400 group-hover:text-[#00c74f]"
                                            }`}
                                    />
                                    <span
                                        className={`text-sm ${isActive
                                            ? "text-white font-medium"
                                            : "text-gray-700 group-hover:text-[#00c74f]"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl p-4" onClick={(e) => e.stopPropagation()}>
                            <div className="space-y-2">
                                {menuItems.map((item, index) => {
                                    const isActive = activeMenuItem === index;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleMenuItemClick(index)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${isActive
                                                ? "bg-[#00c74f] shadow-md"
                                                : "hover:bg-[#e6fce9]"
                                                }`}
                                        >
                                            <item.icon
                                                className={`w-5 h-5 ${isActive
                                                    ? "text-white"
                                                    : "text-gray-400"
                                                    }`}
                                            />
                                            <span
                                                className={`text-sm ${isActive
                                                    ? "text-white font-medium"
                                                    : "text-gray-700"
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Dynamic Section Content */}
                {renderSection()}
            </div>
        </div>
    );
};

export default ChatWindow;
