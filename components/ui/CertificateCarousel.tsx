// components/CertificateCarousel.tsx
"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

interface Certificate {
  name: string;
  icon: string;        // path to the image (e.g. /images/certs/lpi.png)
}

interface CertificateCarouselProps {
  certificates: Certificate[];
  /** optional props for customizing the carousel */
  showArrows?: boolean;
  autoPlay?: boolean;
}

export default function CertificateCarousel({
  certificates,
  showArrows = true,
  autoPlay = false,
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
      className="max-w-2xl mx-auto min-h-[320px] md:min-h-[380px]"
    >
      {certificates.map((cert) => (
        <div key={cert.name} className="flex justify-center p-3">
          <Image
            src={cert.icon}
            alt={cert.name}
            width={500}
            height={500}
            className="object-contain"
            priority={false}
          />
        </div>
      ))}
    </Carousel>
  );
}