import { Bug } from "lucide-react";
import { useState } from "react";

const LaporBugSection = () => {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {
        if (feedback.trim()) {
            // TODO: Implement backend integration
            console.log("Feedback:", feedback);
            alert("Terima kasih! Feedback Anda telah diterima.");
            setFeedback("");
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#f0fdf4] to-[#f0fdf4] border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00c74f] rounded-full flex items-center justify-center">
                        <Bug className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">Lapor Bug</h2>
                        <p className="text-xs text-[#00c74f]">Laporkan masalah yang Anda temukan</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">
                        Kendala Apa yang Anda Alami ketika Menggunakan Chatbot
                    </h3>

                    <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 mb-4">
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Jelaskan kendala yang kalian alami..."
                            rows={12}
                            className="w-full resize-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#00c74f] hover:bg-[#00b045] text-white px-8 py-2 rounded-lg transition-colors font-medium text-sm"
                        >
                            Kirim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaporBugSection;
