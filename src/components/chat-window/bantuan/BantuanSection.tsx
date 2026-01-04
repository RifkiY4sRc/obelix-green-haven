import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const BantuanSection = () => {
    const [expandedItem, setExpandedItem] = useState<number>(1);

    const faqs: FAQItem[] = [
        {
            id: 1,
            question: "Ketik pertanyaan atau permintaan Anda di kolom chat",
            answer:
                "Jelaskan permintaan atau pertanyaan Anda dengan jelas pada chatbot agar mendapatkan hasil yang akurat. Misalnya, jika Anda ingin mengetahui informasi seputar layanan, fasilitas, harga, jam operasional, maupun pertanyaan lainnya. Pastikan pertanyaan Anda ditulis dengan relas agar lebih dapat memberikan jawaban yang sesuai.",
        },
        {
            id: 2,
            question: "Tekan Enter atau Klik tombol kirim",
            answer:
                "Setelah mengetik pertanyaan Anda, tekan tombol Enter pada keyboard atau klik tombol kirim untuk mengirimkan pesan ke chatbot.",
        },
        {
            id: 3,
            question: "Tunggu Respon dari Chatbot",
            answer:
                "Chatbot akan memproses pertanyaan Anda dan memberikan respons dalam beberapa detik. Harap tunggu sebentar.",
        },
        {
            id: 4,
            question: "Berikan rating untuk membantu meningkatkan kualitas",
            answer:
                "Setelah mendapatkan jawaban, Anda dapat memberikan rating untuk membantu kami meningkatkan kualitas layanan chatbot.",
        },
        {
            id: 5,
            question: "Gunakan menu kategori untuk pertanyaan spesifik",
            answer:
                "Anda dapat menggunakan menu Categori Pertanyaan untuk menemukan jawaban cepat berdasarkan topik seperti Reservasi, Tiket, Fasilitas, atau Event.",
        },
        {
            id: 6,
            question: "Laporkan bug atau kendala yang Anda temukan",
            answer:
                "Jika Anda menemukan masalah atau bug saat menggunakan chatbot, silakan gunakan menu Lapor Bug untuk memberitahu kami agar dapat segera diperbaiki.",
        },
    ];

    const toggleItem = (id: number) => {
        setExpandedItem(expandedItem === id ? 0 : id);
    };

    return (
        <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#f0fdf4] to-[#f0fdf4] border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00c74f] rounded-full flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">Bantuan</h2>
                        <p className="text-xs text-[#00c74f]">Informasi kontak dan FAQ</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-center font-bold text-gray-800 text-lg mb-8">
                        Cara Menggunakan Chatbot
                    </h3>

                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleItem(faq.id)}
                                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start gap-3 text-left flex-1">
                                        <span className="font-semibold text-gray-800">{faq.id}.</span>
                                        <span className="text-gray-800 font-medium">{faq.question}</span>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${expandedItem === faq.id ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {expandedItem === faq.id && (
                                    <div className="px-5 pb-4 pt-2">
                                        <p className="text-sm text-gray-600 leading-relaxed pl-6">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BantuanSection;
