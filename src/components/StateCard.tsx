import { Link } from "react-router-dom";
import { type State } from "@/data/states";
import { MapPin, ArrowRight, Lock } from "lucide-react";
import { useRef, useState } from "react";

interface StateCardProps {
  stateData: State;
  index: number;
}

const StateCard = ({ stateData, index }: StateCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const FALLBACK = `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col h-full"
      style={{
        perspective: "1000px",
        animation: `fadeSlideUp 0.5s ${index * 0.1}s ease both`,
        opacity: 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
    >
      <div
        className="relative overflow-hidden rounded-2xl flex flex-col h-full transition-all duration-200"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? "0 25px 60px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)"
            : "0 4px 20px -4px rgba(0,0,0,0.15)",
        }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imgError ? FALLBACK : stateData.image}
            alt={stateData.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Top badge */}
          {!stateData.isAvailable && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md text-white/70 text-xs font-medium px-2.5 py-1.5 rounded-full border border-white/10">
              <Lock className="h-3 w-3" />
              Coming Soon
            </div>
          )}
        </div>

        {/* Glass content panel */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
            backdropFilter: "blur(0px)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-1 opacity-70">
            <MapPin className="h-3 w-3 text-white" />
            <span className="text-white text-xs tracking-wide">India</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-1.5 leading-tight">{stateData.name}</h3>
          <p className="text-white/65 text-xs leading-relaxed line-clamp-2 mb-4">{stateData.description}</p>

          <Link
            to={stateData.isAvailable ? `/state/${stateData.id}` : "#"}
            className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 ${
              stateData.isAvailable
                ? "bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 hover:border-white/40"
                : "bg-white/8 text-white/40 cursor-default border border-white/10"
            }`}
            onClick={(e) => !stateData.isAvailable && e.preventDefault()}
          >
            {stateData.isAvailable ? (
              <>Explore Destinations <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" /></>
            ) : (
              "Coming Soon"
            )}
          </Link>
        </div>

        {/* Shine effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 - tilt.y * 2}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StateCard;
