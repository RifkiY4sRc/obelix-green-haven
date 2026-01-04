import { BarChart3, Star } from "lucide-react";
import { useState } from "react";

const RatingSection = () => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {
        if (rating > 0) {
            // TODO: Implement backend integration
            console.log("Rating:", { rating, feedback });
            alert("Terima kasih atas rating Anda!");
            setRating(0);
            setFeedback("");
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#f0fdf4] to-[#f0fdf4] border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00c74f] rounded-full flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">Rating</h2>
                        <p className="text-xs text-[#00c74f]">Berikan penilaian Anda</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-3xl mx-auto">
                    {/* Star Rating */}
                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="transition-transform hover:scale-110"
                            >
                                <Star
                                    className={`w-16 h-16 ${star <= (hoveredRating || rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Subtitle - Left aligned */}
                    <p className="text-sm text-gray-700 mb-4">
                        Kendala Apa yang Anda Alami ketika Menggunakan Chatbot
                    </p>

                    {/* Feedback Textarea - Reduced height */}
                    <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 mb-4">
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Jelaskan kendala yang kalian alami..."
                            rows={6}
                            className="w-full resize-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            className="bg-[#00c74f] hover:bg-[#00b045] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg transition-colors font-medium text-sm"
                        >
                            Kirim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingSection;
