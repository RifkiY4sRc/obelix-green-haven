import heroImage from "@/assets/hero-obelix.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const Gallery = () => {
  const images = [
    { src: heroImage, alt: "Pemandangan Obelix Village dari atas", span: "col-span-2 row-span-2" },
    { src: gallery1, alt: "Wisata kebun dan sawah", span: "col-span-1 row-span-1" },
    { src: gallery2, alt: "Resto dengan pemandangan sawah", span: "col-span-1 row-span-1" },
    { src: gallery3, alt: "Wahana feeding hewan", span: "col-span-2 row-span-1" },
  ];

  return (
    <section id="galeri" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
            Galeri Foto
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Momen <span className="text-gradient">Indah</span> di Obelix
          </h2>
          <p className="text-muted-foreground text-lg">
            Abadikan kenangan bersama keluarga di berbagai spot foto yang tersedia
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${image.span} relative overflow-hidden rounded-2xl group cursor-pointer`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-primary-foreground font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
