import { Bug } from "lucide-react";
import { useState } from "react";
import { feedbackService } from "@/services/feedbackService";
import { useToast } from "@/hooks/use-toast";
import SuccessModal from "../SuccessModal";

const LaporBugSection = () => {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async () => {
        // Validation
        if (!description.trim()) {
            toast({
                title: "Deskripsi diperlukan",
                description: "Silakan jelaskan kendala yang Anda alami",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const result = await feedbackService.submitBugReport({
                description: description.trim(),
            });

            if (result.success) {
                setShowSuccess(true);
                // Reset form
                setDescription("");
            } else {
                toast({
                    title: "Gagal mengirim laporan",
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
        <div className="flex-1 flex flex-col relative">
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
                <div className="max-w-3xl mx-auto space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">
                        Kendala Apa yang Anda Alami ketika Menggunakan Chatbot
                    </h3>

                    {/* Description */}
                    <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Jelaskan kendala yang Anda alami secara detail..."
                            rows={12}
                            className="w-full resize-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                            disabled={loading}
                        />
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
                title="Laporan Terkirim"
                description="Terima kasih atas laporan Anda. Tim kami akan segera meninjaunya."
            />
        </div>
    );
};

export default LaporBugSection;
