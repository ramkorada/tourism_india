import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/apiClient";
import { destinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import Navbar from "@/components/Navbar";

const Favorites = () => {
  const { user } = useAuth();
  const [favIds, setFavIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    apiFetch<{ destination_id: string }[]>("/favorites").then(({ data }) => {
      setFavIds(data?.map((f) => f.destination_id) || []);
      setLoading(false);
    });
  }, [user]);

  const favDestinations = destinations.filter((d) => favIds.includes(d.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 section-padding">
        <div className="container mx-auto">

          {/* Header */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground text-sm mb-6 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>

          <div
            className="relative overflow-hidden rounded-3xl mb-12 p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, hsl(340 80% 55% / 0.12) 0%, hsl(220 80% 50% / 0.12) 100%)",
              border: "1px solid hsl(340 80% 55% / 0.2)",
              backdropFilter: "blur(20px)",
              animation: "fadeSlideUp 0.5s ease both",
            }}
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(340 80% 55%), transparent)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(220 80% 60%), transparent)" }} />

            <div className="relative z-10 flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(340 80% 55%), hsl(0 80% 60%))", boxShadow: "0 8px 30px hsl(340 80% 55% / 0.4)" }}
              >
                <Heart className="h-8 w-8 text-white fill-white" />
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">My Favorites</h1>
                <p className="text-muted-foreground mt-1">
                  {favDestinations.length > 0
                    ? `${favDestinations.length} saved destination${favDestinations.length > 1 ? "s" : ""}`
                    : "Your saved destinations will appear here"}
                </p>
              </div>
            </div>
          </div>

          {/* States */}
          {!user ? (
            <div
              className="text-center py-24 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                border: "1px dashed rgba(255,255,255,0.12)",
                animation: "fadeSlideUp 0.5s 0.1s ease both",
              }}
            >
              <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(340 80% 55% / 0.15), hsl(220 80% 50% / 0.15))", border: "1px solid hsl(340 80% 55% / 0.2)" }}>
                <Heart className="h-10 w-10 text-rose-400" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Sign in to save favorites</h2>
              <p className="text-muted-foreground text-base mb-6 max-w-sm mx-auto">
                Create an account to save your dream destinations and plan trips effortlessly.
              </p>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, hsl(340 80% 55%), hsl(220 80% 50%))", boxShadow: "0 8px 30px hsl(340 80% 55% / 0.35)" }}
              >
                <Sparkles className="h-4 w-4" />
                Sign In
              </Link>
            </div>
          ) : loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    height: "340px",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                    animation: `pulse 1.5s ${i * 0.2}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          ) : favDestinations.length === 0 ? (
            <div
              className="text-center py-24 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                border: "1px dashed rgba(255,255,255,0.12)",
                animation: "fadeSlideUp 0.5s 0.1s ease both",
              }}
            >
              <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Heart className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">No favorites yet</h2>
              <p className="text-muted-foreground text-base mb-6 max-w-sm mx-auto">
                Explore destinations and tap the heart icon to save your favorites here.
              </p>
              <Link
                to="/state/andhra-pradesh"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-foreground border border-border hover:bg-muted transition-all hover:scale-105"
              >
                Browse Destinations
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favDestinations.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default Favorites;
