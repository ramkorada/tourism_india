import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { states } from "@/data/states";
import { destinations, type Category } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import Navbar from "@/components/Navbar";
import { ArrowLeft, MapPin, Filter } from "lucide-react";

const categories: (Category | "All")[] = ["All", "Nature", "Heritage", "Temples", "Beaches", "Hill Stations", "Wildlife"];

const categoryEmoji: Record<string, string> = {
  All: "🗺️", Nature: "🌿", Heritage: "🏛️", Temples: "🛕", Beaches: "🌊", "Hill Stations": "🏔️", Wildlife: "🦋",
};

const StateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const stateData = states.find((s) => s.id === id);
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [imgError, setImgError] = useState(false);

  const FALLBACK = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80";

  if (!stateData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">State Not Found</h2>
          <Link to="/states" className="text-primary hover:underline">Back to States</Link>
        </div>
      </div>
    );
  }

  const stateDestinations = destinations.filter((d) => d.stateId === stateData.id);

  const filtered = useMemo(() => {
    return stateDestinations.filter((d) => activeCategory === "All" || d.category === activeCategory);
  }, [stateDestinations, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <img
          src={imgError ? FALLBACK : stateData.image}
          onError={() => setImgError(true)}
          alt={stateData.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "zoomIn 8s ease-in-out infinite alternate" }}
        />
        {/* Deep gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.7) 40%, hsl(var(--background) / 0.1) 100%)" }} />
        {/* Subtle vignette sides */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.6) 100%)" }} />

        <div className="relative z-10 container mx-auto px-4 pb-14" style={{ animation: "fadeSlideUp 0.6s ease both" }}>
          <Link to="/states" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group text-sm font-medium">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            All States
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">Incredible India</span>
            </div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
            {stateData.name}
          </h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">{stateData.description}</p>
        </div>
      </section>

      {/* Destinations section */}
      <section
        className="section-padding relative -mt-2"
        style={{ animation: "fadeSlideUp 0.6s 0.2s ease both" }}
      >
        <div className="container mx-auto">
          {!stateData.isAvailable ? (
            <div
              className="text-center py-24 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px dashed rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="text-6xl mb-6">🗺️</div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">Coming Soon</h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
                We're curating the best experiences for {stateData.name}. Check back soon!
              </p>
              <Link
                to="/states"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-primary-foreground transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))", boxShadow: "0 8px 30px hsl(var(--primary) / 0.4)" }}
              >
                Explore Other States
              </Link>
            </div>
          ) : (
            <>
              {/* Header + Filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">Top Destinations</h2>
                  <p className="text-muted-foreground">
                    {filtered.length} {activeCategory !== "All" ? `${activeCategory} ` : ""}destination{filtered.length !== 1 ? "s" : ""} in {stateData.name}
                  </p>
                </div>

                {/* Glass filter pills */}
                <div
                  className="flex gap-2 flex-wrap justify-start md:justify-end p-2 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex items-center gap-1.5 text-muted-foreground mr-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium hidden md:block">Filter</span>
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                      style={{
                        background: activeCategory === cat
                          ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))"
                          : "rgba(255,255,255,0.05)",
                        color: activeCategory === cat ? "white" : "hsl(var(--muted-foreground))",
                        border: activeCategory === cat ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
                        transform: activeCategory === cat ? "scale(1.02)" : "scale(1)",
                        boxShadow: activeCategory === cat ? "0 4px 15px hsl(var(--primary) / 0.4)" : "none",
                      }}
                    >
                      <span>{categoryEmoji[cat]}</span>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map((dest, i) => (
                    <DestinationCard key={dest.id} destination={dest} index={i} />
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-20 rounded-3xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px dashed rgba(255,255,255,0.08)",
                  }}
                >
                  <p className="text-5xl mb-4">{categoryEmoji[activeCategory]}</p>
                  <p className="text-foreground font-semibold mb-2">No {activeCategory} destinations yet</p>
                  <p className="text-muted-foreground text-sm mb-4">Try another category</p>
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="text-primary text-sm font-semibold hover:underline"
                  >
                    Show All →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
};

export default StateDetail;
