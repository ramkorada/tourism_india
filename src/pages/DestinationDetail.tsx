import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Star, Heart, Clock, IndianRupee, Car, Hotel, UtensilsCrossed, Landmark, Wine, Navigation, Calendar, ExternalLink, CheckCircle, AlertTriangle, Backpack, Users, Map, Phone, Globe, Shield } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { destinations } from "@/data/destinations";
import { destinationDetails } from "@/data/destinationDetails";
import { destinationImages } from "@/data/destinationImages";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/apiClient";
import { useToast } from "@/hooks/use-toast";
import ReviewSection from "@/components/ReviewSection";
import Navbar from "@/components/Navbar";
import WeatherWidget from "@/components/WeatherWidget";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const typeIcons: Record<string, any> = {
  hotel: Hotel,
  restaurant: UtensilsCrossed,
  pub: Wine,
  attraction: Landmark,
  transport: Car,
};

const typeLabels: Record<string, string> = {
  hotel: "Hotels",
  restaurant: "Restaurants",
  pub: "Cafés & Pubs",
  attraction: "Attractions",
  transport: "Transport",
};

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dest = destinations.find((d) => d.id === id);
  const detail = id ? destinationDetails[id] : null;
  const images = id ? destinationImages[id] || [] : [];
  const { user } = useAuth();
  const { toast } = useToast();
  const [isFav, setIsFav] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }
  }, []);

  useEffect(() => {
    if (user && id) {
      apiFetch<{ is_favorite: boolean }>(`/favorites/check/${id}`).then(({ data }) => {
        setIsFav(data?.is_favorite ?? false);
      });
    }
  }, [user, id]);

  const toggleFav = async () => {
    if (!user) { toast({ title: "Sign in to save favorites", variant: "destructive" }); return; }
    if (isFav) {
      await apiFetch(`/favorites/${id!}`, { method: "DELETE" });
      setIsFav(false);
      toast({ title: "Removed from favorites" });
    } else {
      await apiFetch("/favorites", {
        method: "POST",
        body: JSON.stringify({ destination_id: id! }),
      });
      setIsFav(true);
      toast({ title: "Added to favorites ❤️" });
    }
  };

  if (!dest || !detail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-foreground mb-4">Destination not found</p>
          <Link to="/destinations" className="text-primary font-semibold hover:underline">← Back to Destinations</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "guide", label: "Travel Guide" },
    { id: "nearby", label: "Nearby Places" },
    { id: "travel", label: "Travel & Costs" },
    { id: "reviews", label: "Reviews" },
  ];

  const nearbyGroups = Object.entries(
    detail.nearbyPlaces.reduce((acc, p) => {
      (acc[p.type] = acc[p.type] || []).push(p);
      return acc;
    }, {} as Record<string, typeof detail.nearbyPlaces>)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image Carousel */}
      <div className="relative h-[50vh] min-h-[350px]">
        {images.length > 1 ? (
          <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
            className="absolute inset-0 h-full"
          >
            <CarouselContent className="h-full -ml-0">
              {images.map((img, i) => (
                <CarouselItem key={i} className="h-full pl-0">
                  <img src={img} alt={`${dest.name} - ${i + 1}`} className="w-full h-[50vh] min-h-[350px] object-cover" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 z-20 bg-background/50 backdrop-blur-sm border-0 hover:bg-background/70" />
            <CarouselNext className="right-4 z-20 bg-background/50 backdrop-blur-sm border-0 hover:bg-background/70" />
          </Carousel>
        ) : (
          <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="hero-gradient-overlay absolute inset-0 z-10 pointer-events-none" />
        <div className="relative z-20 h-full flex flex-col justify-end container mx-auto px-4 pb-8">
          <Link to="/destinations" className="inline-flex items-center gap-1 text-primary-foreground/70 text-sm mb-4 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Destinations
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`${dest.category === "Eco" ? "category-eco" : dest.category === "Cultural" ? "category-cultural" : "category-coastal"} px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block`}>
                {dest.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{dest.name}</h1>
              <div className="flex items-center gap-3 mt-2 text-primary-foreground/80">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {dest.district}</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {dest.rating} ({dest.reviewCount.toLocaleString()})</span>
              </div>
            </div>
            <button onClick={toggleFav} className="mt-2 bg-primary-foreground/20 backdrop-blur-sm p-3 rounded-full hover:bg-primary-foreground/30 transition-colors">
              <Heart className={`h-6 w-6 ${isFav ? "fill-red-500 text-red-500" : "text-primary-foreground"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-background border-b border-border">
        <div className="container mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">About {dest.name}</h2>
                <p className="text-muted-foreground leading-relaxed">{dest.description}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">History</h2>
                <p className="text-muted-foreground leading-relaxed">{detail.history}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">Culture & Traditions</h2>
                <p className="text-muted-foreground leading-relaxed">{detail.culture}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-3">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Best time: {detail.travelInfo.bestTimeToVisit}</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Duration: {detail.travelInfo.idealDuration}</span></div>
                  <div className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Budget: {detail.travelInfo.estimatedDailyCost.budget}/day</span></div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {detail.guideInfo.bestFor.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <a href={dest.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors w-full">
                <Navigation className="h-4 w-4" /> View on Google Maps
              </a>
              {userLocation && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${encodeURIComponent(dest.name + " Andhra Pradesh")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-3 rounded-xl font-semibold hover:bg-secondary/90 transition-colors w-full"
                >
                  <Car className="h-4 w-4" /> Get Directions from My Location
                </a>
              )}
              <WeatherWidget destinationId={dest.id} />
            </div>
          </div>
        )}

        {activeTab === "guide" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Must Visit */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-accent fill-accent" /> Must-Visit Spots
              </h2>
              <ul className="space-y-2">
                {detail.guideInfo.mustVisitSpots.map((spot, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-eco mt-0.5 flex-shrink-0" />
                    {spot}
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Tips */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Local Tips
              </h2>
              <ul className="space-y-2">
                {detail.guideInfo.localTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-bold flex-shrink-0">💡</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Tips */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-accent" /> Safety Tips
              </h2>
              <ul className="space-y-2">
                {detail.guideInfo.safetyTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Carry */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Backpack className="h-5 w-5 text-primary" /> What to Carry
              </h2>
              <div className="flex flex-wrap gap-2">
                {detail.guideInfo.whatToCarry.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-muted text-foreground text-sm rounded-lg">🎒 {item}</span>
                ))}
              </div>
            </div>

            {/* Travel Guide Contacts */}
            <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" /> Travel Guide & Helpline Numbers
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {detail.guideContacts.map((contact, i) => {
                  const typeColors: Record<string, string> = {
                    helpline: "bg-eco/10 text-eco",
                    tour_operator: "bg-coastal/10 text-coastal",
                    local_guide: "bg-cultural/10 text-cultural",
                    emergency: "bg-destructive/10 text-destructive",
                    temple: "bg-accent/10 text-accent",
                    tourism_office: "bg-primary/10 text-primary",
                  };
                  const typeLabelsMap: Record<string, string> = {
                    helpline: "Helpline",
                    tour_operator: "Tour Operator",
                    local_guide: "Local Guide",
                    emergency: "Emergency",
                    temple: "Temple",
                    tourism_office: "Tourism Office",
                  };
                  return (
                    <div key={i} className="flex flex-col gap-2 p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground text-sm">{contact.name}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColors[contact.type] || "bg-muted text-muted-foreground"}`}>
                            {typeLabelsMap[contact.type] || contact.type}
                          </span>
                        </div>
                        {contact.type === "emergency" && <Shield className="h-4 w-4 text-destructive flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{contact.description}</p>
                      <div className="flex items-center gap-2 flex-wrap mt-auto">
                        <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                          <Phone className="h-3 w-3" /> {contact.phone}
                        </a>
                        {contact.website && (
                          <a href={contact.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-coastal font-semibold hover:underline">
                            <Globe className="h-3 w-3" /> Website
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "nearby" && (
          <div className="space-y-8">
            {nearbyGroups.map(([type, places]) => {
              const Icon = typeIcons[type] || Landmark;
              return (
                <div key={type}>
                  <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" /> {typeLabels[type] || type}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {places.map((place, i) => (
                      <div key={i} className="bg-card border border-border rounded-xl p-4 card-hover">
                        <h3 className="font-semibold text-foreground mb-1">{place.name}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>📍 {place.distance} away</p>
                          <p>💰 {place.priceRange}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                            <span>{place.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          {place.bookingUrl && (
                            <a href={place.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                              Book Now <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {place.mapUrl && (
                            <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-eco font-semibold hover:underline">
                              <Map className="h-3 w-3" /> View on Map
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "travel" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" /> How to Get There
              </h2>
              <div className="space-y-4">
                {[
                  { city: "Hyderabad", info: detail.travelInfo.fromHyderabad },
                  { city: "Visakhapatnam", info: detail.travelInfo.fromVisakhapatnam },
                  { city: "Vijayawada", info: detail.travelInfo.fromVijayawada },
                ].map(({ city, info }) => (
                  <div key={city} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground text-sm">From {city}</p>
                      <p className="text-xs text-muted-foreground">{info.mode}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground text-sm">{info.distance}</p>
                      <p className="text-xs text-muted-foreground">{info.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-primary" /> Estimated Daily Cost
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Budget", range: detail.travelInfo.estimatedDailyCost.budget, color: "bg-eco" },
                  { label: "Mid-Range", range: detail.travelInfo.estimatedDailyCost.mid, color: "bg-coastal" },
                  { label: "Luxury", range: detail.travelInfo.estimatedDailyCost.luxury, color: "bg-cultural" },
                ].map(({ label, range, color }) => (
                  <div key={label} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${color}`} />
                      <span className="font-medium text-foreground text-sm">{label}</span>
                    </div>
                    <span className="font-semibold text-foreground text-sm">{range}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground"><Calendar className="h-4 w-4 inline mr-1 text-primary" /> Ideal duration: <strong className="text-foreground">{detail.travelInfo.idealDuration}</strong></p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" /> Cab Services
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {detail.cabServices.map((cab, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{cab.name}</p>
                      <p className="text-xs text-muted-foreground">{cab.contact}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{cab.pricePerKm}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && <ReviewSection destinationId={dest.id} />}
      </div>
    </div>
  );
};

export default DestinationDetail;
