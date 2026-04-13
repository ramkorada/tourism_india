import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
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
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground text-sm mb-4 hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            <h1 className="font-display text-4xl font-bold text-foreground">My Favorites</h1>
          </div>

          {!user ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">Sign in to see your saved destinations</p>
              <Link to="/auth" className="text-primary font-semibold hover:underline">Sign In →</Link>
            </div>
          ) : loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading...</div>
          ) : favDestinations.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">No favorites yet</p>
              <p className="text-muted-foreground text-sm mb-4">Explore destinations and tap the heart icon to save them here</p>
              <Link to="/destinations" className="text-primary font-semibold hover:underline">Browse Destinations →</Link>
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
    </div>
  );
};

export default Favorites;
