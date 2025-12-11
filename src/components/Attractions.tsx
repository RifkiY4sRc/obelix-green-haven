import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const attractions = [
  {
    image: gallery1,
    title: "Wisata Kebun & Sawah",
    description: "Jelajahi keindahan persawahan dan kebun sayur organik. Anak-anak dapat belajar menanam dan merawat tanaman.",
    price: "Gratis",
  },
  {
    image: gallery2,
    title: "Resto & Kuliner",
    description: "Nikmati hidangan lezat khas Jogja dengan pemandangan sawah yang menenangkan. Menu lengkap untuk keluarga.",
    price: "Mulai Rp 25.000",
  },
  {
    image: gallery3,
    title: "Mini Zoo & Feeding",
    description: "Interaksi langsung dengan hewan-hewan lucu. Anak-anak dapat memberi makan kambing, kelinci, dan ayam.",
    price: "Rp 15.000",
  },
];

const Attractions = () => {
  return (
    <section id="wahana" className="section-padding bg-muted">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Wahana Kami
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Eksplorasi <span className="text-gradient">Wahana Seru</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Berbagai wahana menarik yang cocok untuk semua usia, dari anak-anak
            hingga dewasa.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div
              key={attraction.title}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {attraction.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {attraction.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {attraction.description}
                </p>
                <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:bg-transparent">
                  Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Attractions;
