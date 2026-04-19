import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { destinations, type Category } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import Navbar from "@/components/Navbar";

const categories: (Category | "All")[] = ["All", "Nature", "Heritage", "Temples", "Beaches", "Hill Stations", "Wildlife"];

const categoryMeta: Record<string, { emoji: string; color: string }> = {
  All:             { emoji: "🗺️", color: "hsl(220 80% 60%)" },
  Nature:          { emoji: "🌿", color: "hsl(150 60% 45%)" },
  Heritage:        { emoji: "🏛️", color: "hsl(35 90% 50%)" },
  Temples:         { emoji: "🛕", color: "hsl(20 90% 55%)" },
  Beaches:         { emoji: "🌊", color: "hsl(200 80% 50%)" },
  "Hill Stations": { emoji: "🏔️", color: "hsl(168 60% 40%)" },
  Wildlife:        { emoji: "🦋", color: "hsl(120 50% 40%)" },
};

const Destinations = () => {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchCategory = activeCategory === "All" || d.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 section-padding">
        <div className="container mx-auto">

          {/* Page header */}
          <div
            className="mb-10"
            style={{ animation: "fadeSlideUp 0.5s ease both" }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">Incredibe India</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
              All Destinations
            </h1>
            <p className="text-muted-foreground text-lg">
              {destinations.length} incredible places waiting to be explored
            </p>
          </div>

          {/* Glass search + filter bar */}
          <div
            className="flex flex-col md:flex-row gap-4 mb-10 p-4 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(16px)",
              animation: "fadeSlideUp 0.5s 0.1s ease both",
            }}
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Search destinations, districts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-border/50 bg-background/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex gap-2 flex-wrap items-center">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground/60 ml-1 hidden md:block" />
              {categories.map((cat) => {
                const meta = categoryMeta[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${meta.color}, ${meta.color.replace("60%", "70%")})`
                        : "rgba(255,255,255,0.06)",
                      color: isActive ? "white" : "hsl(var(--muted-foreground))",
                      border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: isActive ? `0 4px 20px ${meta.color.replace(")", " / 0.4)")}` : "none",
                      transform: isActive ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    {meta.emoji} {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div
            className="mb-6 flex items-center justify-between"
            style={{ animation: "fadeSlideUp 0.5s 0.15s ease both" }}
          >
            <p className="text-muted-foreground text-sm">
              Showing <span className="text-foreground font-semibold">{filtered.length}</span> destination{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && <> in <span className="text-foreground font-semibold">{activeCategory}</span></>}
              {searchQuery && <> matching "<span className="text-foreground font-semibold">{searchQuery}</span>"</>}
            </p>
            {(activeCategory !== "All" || searchQuery) && (
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="text-xs font-semibold text-primary hover:text-primary/70 transition-colors flex items-center gap-1"
              >
                <X className="h-3 w-3" /> Clear filters
              </button>
            )}
          </div>

          {/* Results grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-24 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-foreground font-semibold text-lg mb-2">No destinations found</p>
              <p className="text-muted-foreground text-sm mb-4">Try adjusting your search or filters</p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="text-primary font-semibold text-sm hover:underline"
              >
                Clear all filters →
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Destinations;
