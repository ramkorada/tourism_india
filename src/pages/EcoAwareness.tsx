import Navbar from "@/components/Navbar";
import { Leaf, Droplets, Footprints, Recycle, Heart, TreePine } from "lucide-react";

const guidelines = [
  {
    icon: Footprints,
    title: "Leave No Trace",
    description: "Carry all your waste back. Avoid littering trails, beaches, and heritage sites. Use biodegradable products.",
  },
  {
    icon: Droplets,
    title: "Conserve Water",
    description: "Use water sparingly, especially in eco-sensitive zones. Support local water conservation initiatives.",
  },
  {
    icon: Recycle,
    title: "Reduce, Reuse, Recycle",
    description: "Carry reusable bottles and bags. Minimize single-use plastics. Choose eco-friendly accommodations.",
  },
  {
    icon: TreePine,
    title: "Respect Wildlife",
    description: "Observe animals from a distance. Never feed wildlife. Stay on marked trails to protect natural habitats.",
  },
  {
    icon: Heart,
    title: "Support Local Communities",
    description: "Buy local handicrafts and produce. Hire local guides. Respect indigenous cultures and traditions.",
  },
  {
    icon: Leaf,
    title: "Choose Green Transport",
    description: "Opt for shared transport, cycling, or walking. Reduce carbon footprint by planning efficient routes.",
  },
];

const EcoAwareness = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-2xl">
          <Leaf className="h-12 w-12 mx-auto mb-6 animate-float" />
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Sustainable Travel Guide
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Andhra Pradesh's natural and cultural treasures need our protection. Follow these guidelines to travel responsibly and preserve these wonders for generations to come.
          </p>
        </div>
      </section>

      {/* Guidelines */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {guidelines.map((g, i) => (
              <div
                key={g.title}
                className="card-hover flex gap-4 p-6 rounded-xl border border-border bg-card opacity-0 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="bg-eco/10 text-eco p-3 rounded-xl h-fit">
                  <g.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-card-foreground mb-1">
                    {g.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {g.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pledge */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto text-center max-w-xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Take the Green Pledge
          </h2>
          <p className="text-muted-foreground mb-6">
            Commit to sustainable travel practices and help preserve Andhra Pradesh's natural beauty.
          </p>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="font-display text-lg italic text-foreground leading-relaxed">
              "I pledge to travel responsibly, respect local cultures and ecosystems, minimize my environmental impact, and contribute positively to the communities I visit."
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="font-display text-lg font-bold text-foreground mb-2">AP Tourism</p>
          <p className="text-muted-foreground text-sm">
            © 2026 Smart Digital Platform for Eco & Cultural Tourism in Andhra Pradesh
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EcoAwareness;
