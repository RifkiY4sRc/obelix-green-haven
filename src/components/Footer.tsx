import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-full bg-primary-foreground/20">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold">OBELIX</span>
                <span className="block text-xs tracking-widest opacity-80">VILLAGE</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 max-w-md">
              Destinasi wisata keluarga terbaik di Yogyakarta yang memadukan
              keindahan alam, edukasi, dan kuliner dalam satu tempat yang nyaman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Tautan</h4>
            <ul className="space-y-3">
              {["Beranda", "Tentang", "Wahana", "Galeri", "Kontak"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Jam Buka</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>Senin - Minggu</li>
              <li className="font-semibold text-primary-foreground">07.00 - 22.00 WIB</li>
              <li className="mt-4">Buka setiap hari</li>
              <li className="text-sm">Termasuk hari libur nasional</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Obelix Village. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm">
            Feel The Harmony Of Nature 🌾
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
