import { useState } from "react";
import { Star } from "lucide-react";
import wahana01 from "@/assets/wahana-01.png";
import wahana02 from "@/assets/wahana-02.png";
import wahana03 from "@/assets/wahana-03.png";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface Attraction {
    id: number;
    name: string;
    description: string;
    rating: number;
    image: string;
    bgColor: string;
}

const WahanaFavoritSection = () => {
    const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

    const attractions: Attraction[] = [
        {
            id: 1,
            name: "Paint ball",
            description:
                "Permainan paintball adalah sebuah permainan simulasi strategi dan kerja tim yang dilakukan di area terbuka maupun tertutup, di mana para pemain saling berhadapan menggunakan senjata khusus (paintball marker) yang menembakkan peluru berisi cat. Peluru ini akan pecah saat mengenai sasaran dan meninggalkan tanda cat, yang menandakan bahwa pemain tersebut telah terkena tembakan dan biasanya dinyatakan gugur atau keluar dari permainan, sesuai dengan aturan yang berlaku.",
            rating: 4.5,
            image: wahana01,
            bgColor: "bg-[#f0fdf4]",
        },
        {
            id: 2,
            name: "Carousel",
            description:
                "Wahana Carousel adalah salah satu wahana permainan klasik yang biasanya terdapat di taman hiburan atau tempat wisata keluarga. Wahana ini berbentuk komidi putar yang berputar secara perlahan, dengan berbagai hiasan menarik seperti kuda, kereta, atau karakter lucu yang dapat dinaiki oleh pengunjung, terutama anak-anak. Carousel bergerak dengan kecepatan yang aman dan diiringi musik cerla, sehingga memberikan pengalaman bermain yang menyenangkan, santai, dan penuh nostalgia. Wahana ini dirancang untuk semua usia, namun sangat cocok untuk anak-anak dan keluarga, kareria tidak memacu adrenalin dan mengutamakan kenyamanan serta keselamatan.",
            rating: 5,
            image: wahana02,
            bgColor: "bg-blue-100",
        },
        {
            id: 3,
            name: "Membatik",
            description:
                "Membatik adalah kegiatan seni dan budaya tradisional Indonesia yang dilakukan dengan cara menghias kain menggunakan malam (lilin batik) sebagai perintang warna. Proses membatik dilakukan dengan menggambar atau menuliskan motif pada kain menggunakan alat khusus yang disebut canting atau dengan cap batik, kemudian kain tersebut melalui proses pewamaan. Bagian kain yang tertutup malam akan tetap mempertaharikan warma aslinya, sehingga membentuk motif batik yang khas dan bemilai seni tinggi.",
            rating: 3.5,
            image: wahana03,
            bgColor: "bg-amber-100",
        },
    ];

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#f0fdf4] to-[#f0fdf4] border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00c74f] rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">Wahana Favorit</h2>
                        <p className="text-xs text-[#00c74f]">Wahana favorit pengunjung</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {attractions.map((attraction) => (
                        <div
                            key={attraction.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200 cursor-pointer"
                            onClick={() => setSelectedAttraction(attraction)}
                        >
                            {/* Image */}
                            <div className="h-40 overflow-hidden bg-gray-100">
                                <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 text-center mb-2">
                                    {attraction.name}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed mb-3 text-justify line-clamp-3">
                                    {attraction.description}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center justify-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-medium text-gray-700">{attraction.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={!!selectedAttraction} onOpenChange={(open) => !open && setSelectedAttraction(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    {selectedAttraction && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-center mb-4">
                                    {selectedAttraction.name}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="rounded-xl overflow-hidden shadow-lg h-64 md:h-80 w-full bg-gray-100">
                                     <img 
                                        src={selectedAttraction.image} 
                                        alt={selectedAttraction.name} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div className="space-y-4 px-2">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(selectedAttraction.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                                />
                                            ))}
                                        </div>
                                        <span className="text-lg font-medium text-gray-700">
                                            {selectedAttraction.rating}/5
                                        </span>
                                    </div>
                                    <DialogDescription className="text-gray-700 text-justify leading-relaxed text-base">
                                        {selectedAttraction.description}
                                    </DialogDescription>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default WahanaFavoritSection;
