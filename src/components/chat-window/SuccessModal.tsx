
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    autoCloseDelay?: number;
}

const SuccessModal = ({ isOpen, onClose, title, description, autoCloseDelay = 3000 }: SuccessModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300); // Wait for exit animation
            }, autoCloseDelay);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [isOpen, onClose, autoCloseDelay]);

    if (!isOpen && !isVisible) return null;

    return (
        <div 
            className={cn(
                "absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity duration-300",
                isVisible ? "opacity-100" : "opacity-0"
            )}
        >
            <div className={cn(
                "flex flex-col items-center justify-center p-6 text-center transform transition-all duration-500",
                isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            )}>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 text-[#00c74f]" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {title}
                </h3>
                
                <p className="text-gray-600 font-medium max-w-xs">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default SuccessModal;
