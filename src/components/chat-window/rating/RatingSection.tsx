import { BarChart3, Star } from "lucide-react";
import { useState } from "react";
import { feedbackService } from "@/services/feedbackService";
import { useToast } from "@/hooks/use-toast";
import SuccessModal from "../SuccessModal";

const RatingSection = () => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async () => {
        // Validation
        if (rating === 0) {
            toast({
                title: "Rating diperlukan",
                description: "Silakan pilih rating 1-5 bintang",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const result = await feedbackService.submitRating({
                rating,
                description: feedback.trim() || "Tidak ada keterangan",
            });

            if (result.success) {
                setShowSuccess(true);
                // Reset form
                setRating(0);
                setFeedback("");
            } else {
                toast({
                    title: "Gagal mengirim rating",
                    description: result.error,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Terjadi kesalahan",
                description: "Silakan coba lagi nanti",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#f0fdf4] to-[#f0fdf4] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00c74f] rounded-full flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">Rating</h2>
                        <p className="text-xs text-[#00c74f]">Berikan penilaian Anda</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#00c74f] rounded-full animate-pulse"></div>
                    <span className="text-sm text-[#00c74f] font-medium">Online</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Star Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                            Berapa rating Anda untuk chatbot ini?
                        </label>
                        <div className="flex justify-center gap-1 sm:gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="transition-transform hover:scale-110 p-1"
                                    disabled={loading}
                                >
                                    <Star
                                        className={`w-10 h-10 sm:w-16 sm:h-16 ${
                                            star <= (hoveredRating || rating)
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feedback Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Keterangan (Opsional)
                        </label>
                        <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Jelaskan pengalaman Anda..."
                                rows={6}
                                className="w-full resize-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-[#00c74f] hover:bg-[#00b045] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg transition-colors font-medium text-sm"
                        >
                            {loading ? "Mengirim..." : "Kirim"}
                        </button>
                    </div>
                </div>
            </div>

            <SuccessModal 
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Terima Kasih!"
                description="Rating dan masukan Anda telah kami terima untuk peningkatan layanan kami."
            />
        </div>
    );
};

export default RatingSection;
