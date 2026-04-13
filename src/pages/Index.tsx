import heroImage from "@/assets/hero-andhra.jpg";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Mountain, Waves } from "lucide-react";
import { destinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import Navbar from "@/components/Navbar";

const Index = () => {
  const featured = destinations.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <img src={heroImage} alt="Andhra Pradesh landscape" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-gradient-overlay absolute inset-0" />
        <div className="relative z-10 container mx-auto px-4 pb-20 md:pb-28">
          <p className="text-primary-foreground/70 text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in">Discover Andhra Pradesh</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground max-w-3xl leading-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Where Nature Meets <span className="text-gradient">Ancient Culture</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
            Explore pristine valleys, sacred temples, and sun-kissed coastlines through sustainable, responsible tourism.
          </p>
          <Link to="/destinations" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
            Explore Destinations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Quick Access - Small Location Cards */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">Quick Access</h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-8">Tap any destination to explore details, nearby places, and plan your trip</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Explore by Category</h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">From misty hill stations to ancient temples and pristine beaches — Andhra Pradesh has it all.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mountain, label: "Eco Tourism", color: "bg-eco/10 text-eco", desc: "Forests, valleys & wildlife" },
              { icon: Leaf, label: "Cultural Heritage", color: "bg-cultural/10 text-cultural", desc: "Temples, history & art" },
              { icon: Waves, label: "Coastal Escapes", color: "bg-coastal/10 text-coastal", desc: "Beaches, water sports & sun" },
            ].map((cat, i) => (
              <Link to="/destinations" key={cat.label} className="card-hover group flex flex-col items-center text-center p-8 rounded-xl border border-border bg-card opacity-0 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <div className={`${cat.color} p-4 rounded-2xl mb-4 transition-transform group-hover:scale-110`}>
                  <cat.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-card-foreground mb-1">{cat.label}</h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Destinations</h2>
              <p className="text-muted-foreground">Handpicked gems across the state</p>
            </div>
            <Link to="/destinations" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Eco Awareness Teaser */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-2xl">
          <Leaf className="h-10 w-10 mx-auto mb-6 opacity-80" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Travel Responsibly</h2>
          <p className="text-primary-foreground/80 text-lg mb-8">Preserve the beauty of Andhra Pradesh for future generations. Learn how you can make a difference with every trip.</p>
          <Link to="/eco-awareness" className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors">
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="font-display text-lg font-bold text-foreground mb-2">AP Tourism</p>
          <p className="text-muted-foreground text-sm">© 2026 Smart Digital Platform for Eco & Cultural Tourism in Andhra Pradesh</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
