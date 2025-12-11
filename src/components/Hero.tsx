import { Button } from "@/components/ui/button";
import { MapPin, Clock, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-obelix.jpg";

const Hero = () => {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Obelix Village - Wisata Alam Jogja"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary-dark/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-secondary/30 blur-2xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-primary-foreground/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 container-wide text-center text-primary-foreground">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <p className="text-secondary font-medium text-sm md:text-base tracking-widest uppercase mb-4">
            Selamat Datang di
          </p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Obelix Village
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto font-light">
            Feel The Harmony Of Nature
          </p>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            Nikmati keindahan alam pedesaan, wahana edukatif, dan kuliner khas
            dalam satu destinasi wisata keluarga terbaik di Yogyakarta.
          </p>

          {/* Info Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm">Sleman, Yogyakarta</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-sm">07.00 - 22.00 WIB</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Jelajahi Sekarang
            </Button>
            <Button variant="heroOutline" size="xl">
              Lihat Galeri
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#tentang" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
