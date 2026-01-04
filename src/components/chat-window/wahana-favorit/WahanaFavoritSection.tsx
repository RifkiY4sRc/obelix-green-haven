import { Star } from "lucide-react";
import wahana01 from "@/assets/wahana-01.png";
import wahana02 from "@/assets/wahana-02.png";
import wahana03 from "@/assets/wahana-03.png";

const WahanaFavoritSection = () => {
    const attractions = [
        {
            id: 1,
            name: "Paint ball",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            rating: 4.5,
            image: wahana01,
            bgColor: "bg-[#f0fdf4]",
        },
        {
            id: 2,
            name: "Carousel",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            rating: 5,
            image: wahana02,
            bgColor: "bg-blue-100",
        },
        {
            id: 3,
            name: "Membatik",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200"
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
        </div>
    );
};

export default WahanaFavoritSection;
