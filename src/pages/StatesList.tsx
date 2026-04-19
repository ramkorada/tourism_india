import { useState, useMemo } from "react";
import { Search, X, Globe } from "lucide-react";
import { states } from "@/data/states";
import StateCard from "@/components/StateCard";
import Navbar from "@/components/Navbar";

const StatesList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStates = useMemo(() => {
    return states.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 section-padding">
        <div className="container mx-auto">

          {/* Hero header */}
          <div
            className="text-center mb-14"
            style={{ animation: "fadeSlideUp 0.55s ease both" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-5">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">Incredible India</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              Explore Every State
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From the snow-capped Himalayas to tropical beaches — discover the breathtaking diversity of India, one state at a time.
            </p>
          </div>

          {/* Glass search bar */}
          <div
            className="flex justify-center mb-12"
            style={{ animation: "fadeSlideUp 0.55s 0.1s ease both" }}
          >
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Search states, places, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-base transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid hsl(var(--primary) / 0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px hsl(var(--primary) / 0.15), 0 4px 30px rgba(0,0,0,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.1)";
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Result count */}
          {searchQuery && (
            <div className="text-center mb-6 text-muted-foreground text-sm" style={{ animation: "fadeSlideUp 0.3s ease both" }}>
              Found <span className="text-foreground font-semibold">{filteredStates.length}</span> state{filteredStates.length !== 1 ? "s" : ""} matching "<span className="text-foreground font-semibold">{searchQuery}</span>"
            </div>
          )}

          {/* Grid */}
          {filteredStates.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStates.map((state, i) => (
                <StateCard key={state.id} stateData={state} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-24 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.08)",
                animation: "fadeSlideUp 0.4s ease both",
              }}
            >
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-foreground font-semibold text-lg mb-2">No states found</p>
              <p className="text-muted-foreground text-sm mb-4">Try a different search term</p>
              <button onClick={() => setSearchQuery("")} className="text-primary font-semibold text-sm hover:underline">
                Clear search →
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

export default StatesList;
