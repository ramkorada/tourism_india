import { useState, useEffect } from "react";
import { Shield, Phone, X, Plus, Trash2, UserPlus, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string | null;
}

const EMERGENCY_NUMBERS = [
  { label: "Police", number: "100", icon: "🚔", color: "#3b82f6" },
  { label: "Ambulance", number: "108", icon: "🚑", color: "#ef4444" },
  { label: "Fire", number: "101", icon: "🚒", color: "#f97316" },
  { label: "Women Helpline", number: "181", icon: "👩", color: "#a855f7" },
  { label: "Child Helpline", number: "1098", icon: "👶", color: "#10b981" },
  { label: "AP Tourism", number: "1800-425-4567", icon: "📞", color: "#6366f1" },
];

const EmergencySOS = () => {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRelation, setNewRelation] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (open && user) {
      fetchContacts();
    }
  }, [open, user]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return;
      const resp = await fetch("/api/emergency-contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        setContacts(data);
      }
    } catch {
      /* ignore */
    }
  };

  const addContact = async () => {
    if (!newName.trim() || !newPhone.trim()) return;
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return;
      const resp = await fetch("/api/emergency-contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName.trim(),
          phone: newPhone.trim(),
          relationship: newRelation.trim() || null,
        }),
      });
      if (resp.ok) {
        setNewName("");
        setNewPhone("");
        setNewRelation("");
        setShowAddForm(false);
        fetchContacts();
      }
    } catch {
      /* ignore */
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return;
      await fetch(`/api/emergency-contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {/* SOS Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="Emergency SOS"
      >
        <div className="relative">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #dc2626, #ef4444)",
            }}
          >
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 bg-white text-red-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow border border-red-200">
            SOS
          </span>
        </div>
      </button>

      {/* SOS Panel */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-card w-full sm:w-[440px] sm:max-h-[90vh] max-h-[85vh] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-auto animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div
              className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl"
              style={{
                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              }}
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-white" />
                <div>
                  <h2 className="text-white font-bold text-lg">
                    Emergency SOS
                  </h2>
                  <p className="text-white/70 text-xs">
                    Quick access to emergency services
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Emergency Numbers */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Emergency Helpline Numbers
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {EMERGENCY_NUMBERS.map((em) => (
                    <a
                      key={em.number}
                      href={`tel:${em.number}`}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group"
                    >
                      <span className="text-2xl">{em.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {em.label}
                        </p>
                        <p
                          className="font-bold text-sm"
                          style={{ color: em.color }}
                        >
                          {em.number}
                        </p>
                      </div>
                      <Phone className="h-3.5 w-3.5 ml-auto text-muted-foreground group-hover:text-red-500 transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Personal Emergency Contacts */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    My Emergency Contacts
                  </h3>
                  {user && (
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="text-xs flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add
                    </button>
                  )}
                </div>

                {!user && (
                  <div className="text-center py-4 bg-muted/50 rounded-xl">
                    <UserPlus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Login to save personal emergency contacts
                    </p>
                  </div>
                )}

                {/* Add form */}
                {showAddForm && user && (
                  <div className="bg-muted/50 rounded-xl p-3 mb-3 space-y-2">
                    <input
                      type="text"
                      placeholder="Contact name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-400/50"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-400/50"
                    />
                    <input
                      type="text"
                      placeholder="Relationship (optional)"
                      value={newRelation}
                      onChange={(e) => setNewRelation(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-400/50"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addContact}
                        disabled={!newName.trim() || !newPhone.trim()}
                        className="flex-1 text-xs py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        Save Contact
                      </button>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="px-3 text-xs py-1.5 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Contact list */}
                {user && contacts.length > 0 && (
                  <div className="space-y-2">
                    {contacts.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card"
                      >
                        <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 font-bold text-sm shrink-0">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {c.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {c.phone}
                            {c.relationship && ` • ${c.relationship}`}
                          </p>
                        </div>
                        <a
                          href={`tel:${c.phone}`}
                          className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200 transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                        <button
                          onClick={() => deleteContact(c.id)}
                          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-muted-foreground hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {user && contacts.length === 0 && !showAddForm && (
                  <p className="text-xs text-muted-foreground text-center py-3">
                    No saved contacts yet. Add your emergency contacts to access
                    them quickly.
                  </p>
                )}
              </div>

              {/* Safety tip */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
                <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">
                  💡 Safety Tip
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Always share your travel itinerary with a trusted contact.
                  Keep this app handy for quick access to emergency numbers
                  while traveling in Andhra Pradesh.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencySOS;
