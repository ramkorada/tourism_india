import { Link } from "react-router-dom";
import { type Destination } from "@/data/destinations";
import { destinationImages } from "@/data/destinationImages";
import { destinationFallbacks } from "@/data/destinationFallbacks";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useRef, useState, useEffect } from "react";

interface DestinationCardProps {
  destination: Destination;
  index: number;
  compact?: boolean;
}

const categoryConfig: Record<string, { label: string; color: string; glow: string }> = {
  "Nature":        { label: "Nature",        color: "bg-emerald-500/90 text-white",   glow: "rgba(16,185,129,0.4)"  },
  "Heritage":      { label: "Heritage",      color: "bg-amber-600/90 text-white",     glow: "rgba(217,119,6,0.4)"   },
  "Temples":       { label: "Temples",       color: "bg-orange-500/90 text-white",    glow: "rgba(249,115,22,0.4)"  },
  "Beaches":       { label: "Beaches",       color: "bg-blue-500/90 text-white",      glow: "rgba(59,130,246,0.4)"  },
  "Hill Stations": { label: "Hill Stations", color: "bg-teal-600/90 text-white",      glow: "rgba(13,148,136,0.4)"  },
  "Wildlife":      { label: "Wildlife",      color: "bg-green-600/90 text-white",     glow: "rgba(22,163,74,0.4)"   },
};

const DestinationCard = ({ destination, index, compact }: DestinationCardProps) => {
  // Merge local images + fallbacks, deduplicated
  const localImages = destinationImages[destination.id]?.length
    ? destinationImages[destination.id]
    : [destination.image];
  const fallbacks = destinationFallbacks[destination.id] || [];

  const [imgIndex, setImgIndex] = useState(0);   // which source to try (0 = localImages, 1+ = fallbacks)
  const [failedLocal, setFailedLocal] = useState<Set<number>>(new Set());
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cfg = categoryConfig[destination.category] || { label: destination.category, color: "bg-gray-500/90 text-white", glow: "rgba(100,100,100,0.4)" };

  // Per-image error → switch to corresponding fallback
  const getSrc = (i: number): string => {
    if (failedLocal.has(i)) {
      return fallbacks[i] || fallbacks[0] || localImages[i];
    }
    return localImages[i];
  };

  const handleImgError = (i: number) => {
    setFailedLocal((prev) => new Set([...prev, i]));
  };

  // Intersection Observer for scroll-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  if (compact) {
    return (
      <div ref={cardRef}>
        <Link
          to={`/destination/${destination.id}`}
          className="group flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card hover:border-border hover:shadow-lg transition-all duration-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.4s ${index * 60}ms ease, transform 0.4s ${index * 60}ms ease`,
          }}
        >
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <img
              src={getSrc(0)}
              onError={() => handleImgError(0)}
              alt={destination.name}
              className="w-16 h-16 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm font-bold text-card-foreground truncate">{destination.name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{destination.district}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-foreground">{destination.rating}</span>
              <span className={`${cfg.color} text-[10px] px-1.5 py-0.5 rounded-full ml-1`}>{cfg.label}</span>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.5s ${index * 80}ms ease, transform 0.5s ${index * 80}ms ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={`/destination/${destination.id}`}
        className="rounded-2xl overflow-hidden flex flex-col h-full"
        style={{
          border: hovered ? `1px solid ${cfg.glow.replace("0.4", "0.5")}` : "1px solid rgba(255,255,255,0.07)",
          boxShadow: hovered
            ? `0 20px 60px -12px ${cfg.glow}, 0 0 0 1px ${cfg.glow.replace("0.4", "0.1")}`
            : "0 4px 20px -4px rgba(0,0,0,0.12)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.03)",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Image area */}
        <div className="relative h-52 overflow-hidden bg-muted">
          {localImages.length > 1 ? (
            <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]} className="h-full">
              <CarouselContent className="-ml-0 h-full">
                {localImages.map((_, i) => (
                  <CarouselItem key={i} className="pl-0 h-full">
                    <img
                      src={getSrc(i)}
                      onError={() => handleImgError(i)}
                      alt={`${destination.name} ${i + 1}`}
                      className="w-full h-52 object-cover"
                      style={{ transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.7s ease" }}
                      loading="lazy"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <img
              src={getSrc(0)}
              onError={() => handleImgError(0)}
              alt={destination.name}
              className="w-full h-full object-cover"
              style={{ transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.7s ease" }}
              loading="lazy"
            />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category pill */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`${cfg.color} text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg`}>
              {cfg.label}
            </span>
          </div>

          {/* Rating pill */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-white">{destination.rating}</span>
          </div>
        </div>

        {/* Glass content */}
        <div
          className="flex-1 p-5 relative"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)" }}
        >
          <h3 className="font-display text-lg font-bold text-foreground mb-1 leading-tight">{destination.name}</h3>
          <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{destination.district}</span>
            <span className="text-xs opacity-50">· {destination.reviewCount.toLocaleString()} reviews</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{destination.description}</p>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
            Explore Details
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300"
              style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}
            />
          </span>

          {/* Glow line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, ${cfg.glow.replace("0.4", "0.8")}, transparent)`,
              opacity: hovered ? 1 : 0,
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;
