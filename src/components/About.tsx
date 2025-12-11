import { Leaf, Users, Utensils, Camera } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Alam Asri",
    description: "Hamparan sawah hijau dan udara segar pedesaan yang menyejukkan",
  },
  {
    icon: Users,
    title: "Edukasi Keluarga",
    description: "Wahana edukatif untuk anak-anak belajar sambil bermain",
  },
  {
    icon: Utensils,
    title: "Kuliner Lokal",
    description: "Nikmati hidangan khas Jogja dengan pemandangan sawah",
  },
  {
    icon: Camera,
    title: "Spot Instagramable",
    description: "Berbagai spot foto menarik untuk diabadikan",
  },
];

const About = () => {
  return (
    <section id="tentang" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
            Tentang Kami
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Destinasi Wisata <span className="text-gradient">Keluarga</span> Terbaik
          </h2>
          <p className="text-muted-foreground text-lg">
            Obelix Village adalah destinasi wisata baru di Sleman yang memadukan
            keindahan alam pedesaan, wahana edukasi, dan kuliner dalam satu tempat
            yang nyaman untuk seluruh keluarga.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card p-8 rounded-2xl hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "5+", label: "Wahana Seru" },
            { number: "10+", label: "Spot Foto" },
            { number: "15+", label: "Menu Kuliner" },
            { number: "1000+", label: "Pengunjung/Hari" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </p>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
