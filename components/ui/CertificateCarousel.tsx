// components/CertificateCarousel.tsx
"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

interface Certificate {
  name: string;
  icon: string;  
}

interface CertificateCarouselProps {
  certificates: Certificate[];
  showArrows?: boolean;
  autoPlay?: boolean;
}

export default function CertificateCarousel({
  certificates,
  showArrows = true,
  autoPlay = true,
}: CertificateCarouselProps) {
  return (
    <Carousel
      showArrows={showArrows}
      showStatus={false}
      showIndicators={true}
      showThumbs={false}
      infiniteLoop
      autoPlay={autoPlay}
      interval={5000}
      swipeable
      emulateTouch
      className="max-w-2xl mx-auto min-h-80 md:min-h-95"
    >
      {certificates.map((cert) => (
        <div key={cert.name} tabIndex={-1} className="flex justify-center p-1 pointer‑events: none;">
          <div className="absolute inset-x-0 top-0 bg-black/50 py-3 text-center text-sm text-white pointer-events-none select-none">
            {cert.name}
          </div>
          <Image
            src={cert.icon}
            alt={cert.name}
            width={500}
            height={500}
            className="object-contain pointer-events-none select-none"
            priority={false}
          />          
        </div>
      ))}
    </Carousel>
  );
}