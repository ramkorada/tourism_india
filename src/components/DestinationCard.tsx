import { Link } from "react-router-dom";
import { type Destination } from "@/data/destinations";
import { destinationImages } from "@/data/destinationImages";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface DestinationCardProps {
  destination: Destination;
  index: number;
  compact?: boolean;
}

const categoryStyles: Record<string, string> = {
  Eco: "category-eco",
  Cultural: "category-cultural",
  Coastal: "category-coastal",
};

const DestinationCard = ({ destination, index, compact }: DestinationCardProps) => {
  const images = destinationImages[destination.id] || [destination.image];

  if (compact) {
    return (
      <Link
        to={`/destination/${destination.id}`}
        className="card-hover group flex items-center gap-3 p-3 rounded-xl bg-card border border-border opacity-0 animate-fade-in"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          {images.length > 1 ? (
            <Carousel
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
              className="h-full"
            >
              <CarouselContent className="-ml-0 h-full">
                {images.map((img, i) => (
                  <CarouselItem key={i} className="pl-0 h-full">
                    <img src={img} alt={`${destination.name} ${i + 1}`} className="w-16 h-16 object-cover" loading="lazy" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <img src={destination.image} alt={destination.name} className="w-16 h-16 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-sm font-bold text-card-foreground truncate">{destination.name}</h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{destination.district}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="h-3 w-3 text-accent fill-accent" />
            <span className="text-xs font-semibold text-foreground">{destination.rating}</span>
            <span className={`${categoryStyles[destination.category]} text-[10px] px-1.5 py-0.5 rounded-full ml-1`}>
              {destination.category}
            </span>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </Link>
    );
  }

  return (
    <Link
      to={`/destination/${destination.id}`}
      className="card-hover group rounded-xl overflow-hidden bg-card border border-border shadow-sm opacity-0 animate-fade-in block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Carousel */}
      <div className="relative h-56 overflow-hidden">
        {images.length > 1 ? (
          <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
            className="h-full"
          >
            <CarouselContent className="-ml-0 h-full">
              {images.map((img, i) => (
                <CarouselItem key={i} className="pl-0 h-full">
                  <img
                    src={img}
                    alt={`${destination.name} ${i + 1}`}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        )}
        <div className="absolute top-3 left-3 z-10">
          <span className={`${categoryStyles[destination.category]} px-3 py-1 rounded-full text-xs font-semibold tracking-wide`}>
            {destination.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-3.5 w-3.5 text-accent fill-accent" />
          <span className="text-xs font-semibold text-foreground">{destination.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-card-foreground mb-1">{destination.name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{destination.district}</span>
          <span className="text-xs">· {destination.reviewCount.toLocaleString()} reviews</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{destination.description}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
          Explore Details <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

export default DestinationCard;
