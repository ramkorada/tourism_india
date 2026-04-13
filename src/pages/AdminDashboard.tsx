import { useState, useEffect } from "react";
import { Shield, ShieldAlert, Key, Users, MapPin, Heart, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/use-toast";

interface EnrichedFavorite {
  id: string;
  name: string;
  district: string;
}

interface UserContact {
  id: string;
  name: string;
  phone: string;
  relationship: string | null;
}

interface AdminUser {
  email: string;
  display_name: string;
  created_at: string;
  contacts: UserContact[];
  favorites: EnrichedFavorite[];
}

const AdminDashboard = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/dashboard-data?key=${encodeURIComponent(password)}`);
      
      if (!res.ok) {
        toast({
          title: "Access Denied",
          description: "Incorrect admin key.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUsers(data);
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the secret admin dashboard.",
      });
    } catch (err) {
      toast({
        title: "Connection Error",
        description: "Could not connect to the server.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 mt-16">
          <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600">
                <ShieldAlert className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Creator Dashboard</h1>
            <p className="text-muted-foreground text-center text-sm mb-6">
              Enter the master key to view application data.
            </p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Key className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Secret Key"
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-xl bg-background text-foreground"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-primary text-primary-foreground py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Access Dashboard"}
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="flex items-center gap-4 mb-8 border-b border-border pb-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Directory</h1>
            <p className="text-muted-foreground">Showing raw data for {users.length} registered users.</p>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-2xl border border-border">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No Users Found</h3>
            <p className="text-muted-foreground">There are currently no users registered in the database.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {users.map((u, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 bg-muted/30 border-b border-border flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{u.display_name}</h3>
                    <p className="text-sm text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    Joined: {u.created_at ? new Date(u.created_at).toLocaleDateString() : "Unknown"}
                  </div>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  {/* Preferences / Favorites */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
                      <Heart className="w-4 h-4" /> Favorites ({u.favorites.length})
                    </h4>
                    {u.favorites.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">No favorites saved.</p>
                    ) : (
                      <ul className="space-y-2">
                        {u.favorites.map((fav) => (
                          <li key={fav.id} className="text-sm flex items-start gap-2 bg-muted/50 p-2 rounded-lg">
                            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium block">{fav.name}</span>
                              <span className="text-xs text-muted-foreground block">{fav.district}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Emergency Contacts */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-red-500">
                      <Phone className="w-4 h-4" /> Emergency SOS ({u.contacts.length})
                    </h4>
                    {u.contacts.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">No contacts saved.</p>
                    ) : (
                      <ul className="space-y-2">
                        {u.contacts.map((contact) => (
                          <li key={contact.id} className="text-sm bg-red-50 dark:bg-red-950/20 p-2 rounded-lg border border-red-100 dark:border-red-900/30">
                            <span className="font-medium flex justify-between">
                              {contact.name}
                              <a href={`tel:${contact.phone}`} className="text-blue-500 hover:underline">{contact.phone}</a>
                            </span>
                            {contact.relationship && (
                              <span className="text-xs text-muted-foreground block mt-1">Relation: {contact.relationship}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
