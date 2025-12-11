import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/icon.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#beranda", label: "Beranda" },
    { href: "#tentang", label: "Tentang" },
    { href: "#wahana", label: "Wahana" },
    { href: "#galeri", label: "Galeri" },
    { href: "#kontak", label: "Kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <a href="#beranda" className="flex items-center gap-2 group">
          <img 
            src={logoIcon} 
            alt="Obelix Village Logo" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <span className={`font-heading text-xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-primary" : "text-primary-foreground"
            }`}>
              OBELIX
            </span>
            <span className={`block text-xs font-body tracking-widest transition-colors duration-300 ${
              isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
            }`}>
              VILLAGE
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-medium text-sm transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button variant={isScrolled ? "default" : "hero"} size="sm">
            Pesan Tiket
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? "text-foreground" : "text-primary-foreground"
          }`}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md shadow-elevated transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-wide py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground hover:text-primary font-medium text-base py-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="nature" size="lg" className="mt-2">
            Pesan Tiket
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
