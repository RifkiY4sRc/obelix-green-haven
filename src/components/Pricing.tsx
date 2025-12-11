import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const pricingPlans = [
  {
    name: "Tiket Masuk",
    price: "Rp 25.000",
    period: "/orang",
    description: "Akses ke seluruh area wisata Obelix Village",
    features: [
      "Akses area sawah & taman",
      "Area bermain anak",
      "Spot foto instagramable",
      "Parkir gratis",
    ],
    popular: false,
  },
  {
    name: "Paket Keluarga",
    price: "Rp 100.000",
    period: "/4 orang",
    description: "Hemat untuk kunjungan bersama keluarga",
    features: [
      "Tiket masuk 4 orang",
      "Welcome drink",
      "Akses wahana feeding",
      "Diskon 10% resto",
      "Foto polaroid gratis",
    ],
    popular: true,
  },
  {
    name: "Paket Lengkap",
    price: "Rp 175.000",
    period: "/orang",
    description: "Pengalaman wisata lengkap dengan makan siang",
    features: [
      "Tiket masuk",
      "Makan siang prasmanan",
      "Semua wahana",
      "Souvenir eksklusif",
      "Guide pendamping",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Harga Tiket
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pilih <span className="text-gradient">Paket</span> Terbaik
          </h2>
          <p className="text-muted-foreground text-lg">
            Harga terjangkau untuk pengalaman wisata yang tak terlupakan
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? "shadow-elevated border-2 border-primary scale-105"
                  : "shadow-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Populer
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "nature" : "outline"}
                size="lg"
                className="w-full"
              >
                Pesan Sekarang
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
