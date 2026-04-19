import { useState } from "react";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";
import { destinationDetails } from "@/data/destinationDetails";
import { destinationImages } from "@/data/destinationImages";
import { states, type State } from "@/data/states";
import Navbar from "@/components/Navbar";
import { Plus, X, MapPin, IndianRupee, Calendar, ArrowRight, Route, Clock, ChevronLeft } from "lucide-react";

const TripPlanner = () => {
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const stateDestinations = selectedState 
    ? destinations.filter((d) => d.stateId === selectedState.id)
    : [];

  const selectedDests = selected.map((id) => ({
    dest: destinations.find((d) => d.id === id)!,
    detail: destinationDetails[id],
  })).filter(item => item.detail); // Ensure detail exists

  // Calculate totals
  const parseBudget = (range: string) => {
    const match = range?.match(/[\d,]+/g);
    if (!match) return 0;
    return parseInt(match[0].replace(",", ""));
  };

  const totalDays = selectedDests.reduce((sum, { detail }) => {
    const match = detail.travelInfo.idealDuration.match(/\d+/);
    return sum + (match ? parseInt(match[0]) : 1);
  }, 0);

  const totalBudget = selectedDests.reduce(
    (sum, { detail }) => sum + parseBudget(detail.travelInfo.estimatedDailyCost.budget),
    0
  );
  const totalMid = selectedDests.reduce(
    (sum, { detail }) => sum + parseBudget(detail.travelInfo.estimatedDailyCost.mid),
    0
  );
  const totalLuxury = selectedDests.reduce(
    (sum, { detail }) => sum + parseBudget(detail.travelInfo.estimatedDailyCost.luxury),
    0
  );

  // Build itinerary
  let dayCounter = 0;
  const itinerary = selectedDests.map(({ dest, detail }) => {
    const daysMatch = detail.travelInfo.idealDuration.match(/\d+/);
    const days = daysMatch ? parseInt(daysMatch[0]) : 1;
    const startDay = dayCounter + 1;
    dayCounter += days;
    return {
      dest,
      detail,
      startDay,
      endDay: dayCounter,
      days,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 animate-in fade-in duration-500">
        
        {!selectedState ? (
          // Step 1: State Selection
          <>
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Plan Your Trip
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                First, choose a destination state to start building your custom itinerary.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Available Right Now</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {states.filter(s => s.isAvailable).map((state) => (
                  <button
                    key={state.id}
                    onClick={() => setSelectedState(state)}
                    className="card-hover relative overflow-hidden rounded-2xl border-2 border-transparent hover:border-primary transition-all text-left group aspect-[4/3]"
                  >
                    <img src={state.image} alt={state.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-display text-2xl font-bold">{state.name}</h3>
                      <p className="text-white/80 text-sm mt-1 flex items-center gap-1 group-hover:text-white transition-colors">
                        Start Planning <ArrowRight className="h-4 w-4" />
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Coming Soon</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-60">
                {states.filter(s => !s.isAvailable).map((state) => (
                  <div
                    key={state.id}
                    className="relative overflow-hidden rounded-2xl border border-border bg-card grayscale text-left aspect-[4/3] flex flex-col justify-end p-5"
                  >
                    <img src={state.image} alt={state.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                    <div className="relative z-10">
                      <h3 className="text-white font-display text-xl font-bold opacity-80">{state.name}</h3>
                      <p className="text-white/60 text-sm mt-1">Curating soon...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          // Step 2: Destination Selection
          <div className="animate-in slide-in-from-right-8 duration-500">
            <button 
              onClick={() => { setSelectedState(null); setSelected([]); }}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Back to States
            </button>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Plan your {selectedState.name} Trip
            </h1>
            <p className="text-muted-foreground mb-8">
              Select destinations to build your custom itinerary
            </p>

            {/* Destination selector */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {stateDestinations.map((dest) => {
                const isSelected = selected.includes(dest.id);
                const images = destinationImages[dest.id] || [dest.image];
                return (
                  <button
                    key={dest.id}
                    onClick={() => toggle(dest.id)}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 ring-2 ring-primary"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={images[0]}
                      alt={dest.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-bold text-card-foreground truncate">
                        {dest.name}
                      </h3>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {dest.district}
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      {isSelected ? (
                        <X className="h-5 w-5 text-primary" />
                      ) : (
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selected.length === 0 ? (
               <div className="text-center py-20 bg-muted/20 border border-border border-dashed rounded-3xl">
                <Route className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  Tap destinations above to start planning your trip
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Itinerary */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" /> Your Itinerary
                  </h2>
                  {itinerary.map(({ dest, detail, startDay, endDay, days }, i) => (
                    <div
                      key={dest.id}
                      className="bg-card border border-border rounded-xl p-5 relative"
                    >
                      {i < itinerary.length - 1 && (
                        <div className="absolute left-8 -bottom-4 h-4 w-0.5 bg-border z-10" />
                      )}
                      <div className="flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-display text-lg font-bold text-foreground">
                              {dest.name}
                            </h3>
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              Day {startDay}
                              {endDay > startDay ? `–${endDay}` : ""} · {days}d
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {dest.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-primary" /> Best:{" "}
                              {detail.travelInfo.bestTimeToVisit}
                            </span>
                            <span className="flex items-center gap-1">
                              <IndianRupee className="h-3 w-3 text-primary" />{" "}
                              {detail.travelInfo.estimatedDailyCost.budget}/day
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {detail.guideInfo.mustVisitSpots.slice(0, 4).map((spot) => (
                              <span
                                key={spot}
                                className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                              >
                                {spot}
                              </span>
                            ))}
                            {detail.guideInfo.mustVisitSpots.length > 4 && (
                              <span className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                                +{detail.guideInfo.mustVisitSpots.length - 4} more
                              </span>
                            )}
                          </div>
                          <Link
                            to={`/destination/${dest.id}`}
                            className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-3 hover:underline"
                          >
                            View full details <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary sidebar */}
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-5 sticky top-20">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4">
                      Trip Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Destinations</span>
                        <span className="font-semibold text-foreground">
                          {selected.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Duration</span>
                        <span className="font-semibold text-foreground">
                          {totalDays} days
                        </span>
                      </div>
                      <div className="border-t border-border pt-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">
                          Estimated Total Cost
                        </p>
                        {[
                          {
                            label: "Budget",
                            total: totalBudget * totalDays,
                            color: "bg-emerald-500",
                          },
                          {
                            label: "Mid-Range",
                            total: totalMid * totalDays,
                            color: "bg-blue-500",
                          },
                          {
                            label: "Luxury",
                            total: totalLuxury * totalDays,
                            color: "bg-amber-500",
                          },
                        ].map(({ label, total, color }) => (
                          <div
                            key={label}
                            className="flex items-center justify-between py-1.5"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                              <span className="text-foreground">{label}</span>
                            </div>
                            <span className="font-semibold text-foreground">
                              ₹{total.toLocaleString("en-IN")}+
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-border pt-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">
                          Route Order
                        </p>
                        <div className="space-y-1">
                          {itinerary.map(({ dest }, i) => (
                            <div
                              key={dest.id}
                              className="flex items-center gap-2 text-xs"
                            >
                              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                                {i + 1}
                              </span>
                              <span className="text-foreground">{dest.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {selected.length >= 2 && (
                        <a
                          href={`https://www.google.com/maps/dir/${selectedDests
                            .map(({ dest }) => encodeURIComponent(dest.name + " " + selectedState.name))
                            .join("/")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors w-full mt-3"
                        >
                          <Route className="h-4 w-4" /> View Route on Maps
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
