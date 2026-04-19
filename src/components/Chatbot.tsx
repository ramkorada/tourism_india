import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Msg {
  role: "user" | "assistant";
  content: string;
}



const SUGGESTIONS = [
  "Best beaches in India 🏖️",
  "Plan a 5-day Kerala trip 🗺️",
  "Budget tips for Rajasthan 💰",
  "Araku Valley travel guide 🌿",
  "India emergency numbers 🚨",
  "Best street food in India 🍛",
  "Tirupati darshan tips 🛕",
  "Compare Goa vs Andhra beaches",
];

const callMockAI = async (messages: Msg[]): Promise<string> => {
  // Simulate network delay / "Thinking" time (1.5 to 2.5 seconds)
  const delay = Math.floor(Math.random() * 1000) + 1500;
  await new Promise(resolve => setTimeout(resolve, delay));

  const lastMsg = messages[messages.length - 1].content.toLowerCase();

  if (lastMsg.includes("kerala")) {
    return "Kerala is beautiful! 🌴 Here is a quick 5-day itinerary:\n\n**Day 1:** Arrive in Kochi, explore Fort Kochi.\n**Day 2:** Drive to Munnar, visit tea gardens.\n**Day 3:** Munnar sightseeing (Mattupetty Dam, Echo Point).\n**Day 4:** Head to Alleppey for a houseboat overnight stay on the backwaters.\n**Day 5:** Return to Kochi and depart. \n\n*Budget:* Around ₹15,000 - ₹25,000 per person.";
  }
  
  if (lastMsg.includes("budget") || lastMsg.includes("cheap") || lastMsg.includes("money")) {
    return "Traveling on a budget? 💰 Great idea!\n\nHere are some of the best budget-friendly destinations in India:\n- **Rishikesh:** Affordable hostels and amazing riverside cafes.\n- **Hampi:** Ancient ruins with cheap homestays.\n- **Gokarna:** Beautiful beaches, very budget-friendly alternative to Goa.\n- **Pushkar:** Amazing desert vibes and very cheap street food.\n\n*Tip:* Always use local sleeper trains and state transport buses to save money!";
  }

  if (lastMsg.includes("beach") || lastMsg.includes("goa") || lastMsg.includes("andhra") || lastMsg.includes("coast")) {
    return "India has over 7,500 km of coastline! 🏖️\n\n- **Goa:** Famous for its legendary nightlife and vibrant beaches like Baga and Anjuna.\n- **Andhra Pradesh:** For pristine, less crowded shores, visit **Rishikonda Beach** or **Yarada Beach** in Vizag.\n- **Andaman & Nicobar:** Radhanagar Beach is consistently ranked among the best in all of Asia!\n\nWhat kind of beach vibe are you looking for?";
  }

  if (lastMsg.includes("emergency") || lastMsg.includes("police") || lastMsg.includes("help") || lastMsg.includes("hospital")) {
    return "🚨 **Emergency Numbers in India:**\n\n- **National Emergency:** 112\n- **Police:** 100\n- **Fire:** 101\n- **Ambulance:** 108\n- **Women Helpline:** 1091\n\nPlease stay safe! If you need immediate assistance, call 112 anywhere in India.";
  }

  if (lastMsg.includes("tirupati") || lastMsg.includes("temple") || lastMsg.includes("darshan")) {
    return "🛕 **Tirupati Temple Travel Tips:**\n\n- The Sri Venkateswara Temple is one of the most visited sacred sites globally.\n- **Darshan Booking:** Always book your Special Entry Darshan (₹300) online 2-3 months in advance via the official TTD website.\n- **Dress Code:** Traditional wear is strictly enforced (Dhoti/Kurta for men, Sarees/Chudidars with dupatta for women).\n- **Must Try:** Don't miss the famous Tirupati Laddu Prasadam!";
  }

  if (lastMsg.includes("araku") || lastMsg.includes("hill station")) {
    return "🌿 **Araku Valley** is a stunning hill station in Andhra Pradesh!\n\n- **Best Time to Visit:** October to March.\n- **Highlights:** Expansive coffee plantations, the local Tribal Museum, and the famous **Borra Caves** (a must-visit 150-million-year-old limestone cave).\n- **Travel Tip:** Take the Vistadome glass-roof train from Vizag to Araku for breathtaking valley views along the journey!";
  }

  if (lastMsg.includes("food") || lastMsg.includes("eat") || lastMsg.includes("biryani")) {
    return "🍛 **Indian Culinary Highlights:**\n\n- **North India:** Don't miss Chole Bhature in Delhi or Butter Chicken in Punjab.\n- **South India:** Try the authentic Hyderabadi or Andhra Biryani (spicy!), and traditional Dosa/Idli in Tamil Nadu.\n- **Street food:** Pani Puri and Vada Pav are absolute must-tries if you're in Mumbai.\n\n*A quick tip: stick to bottled water and busy stalls for street food!*";
  }

  // Default fallback response
  return "That's a fantastic question about incredible India! 🇮🇳\n\nIndia offers a massive variety of landscapes, cultures, and traditions. Depending on your preferences, you could visit the royal palaces of Rajasthan, the lush green backwaters of the South, the majestic Himalayas in the North, or the ancient temples in Andhra Pradesh.\n\nCould you specify which state or type of experience (like adventure, spiritual, or relaxing) you are looking for?";
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Msg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await callMockAI(newMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("AI error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ I'm having trouble connecting right now. Please check your internet connection and try again in a moment.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleSend = () => {
    if (input.trim()) sendMessage(input.trim());
  };

  const resetChat = () => setMessages([]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
        style={{
          background: "linear-gradient(135deg, hsl(220 80% 50%), hsl(28 90% 55%))",
          boxShadow: "0 8px 30px hsl(220 80% 50% / 0.5)",
        }}
        aria-label="Open AI Travel Guide"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <Sparkles className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[560px] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            background: "hsl(220 25% 8%)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            animation: "slideUpChat 0.3s cubic-bezier(0.4,0,0.2,1) both",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3.5 flex items-center justify-between shrink-0"
            style={{ background: "linear-gradient(135deg, hsl(220 80% 40%), hsl(28 90% 45%))" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">India AI Travel Guide</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  <p className="text-xs text-white/70">Powered by Pollinations AI</p>
                </div>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              title="Reset chat"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
            {/* Welcome state */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-3 gap-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(220 80% 50% / 0.2), hsl(28 90% 55% / 0.2))", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-base">Hi! I'm your India Travel Guide 🌟</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Ask me anything — trip planning, best time to visit, budget tips, hidden gems & more!
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center w-full">
                  {SUGGESTIONS.slice(0, 6).map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "hsl(var(--muted-foreground))",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.color = "hsl(var(--foreground))";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.color = "hsl(var(--muted-foreground))";
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                  }`}
                  style={
                    msg.role === "user"
                      ? { background: "linear-gradient(135deg, hsl(220 80% 50%), hsl(220 80% 40%))", color: "white" }
                      : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", color: "hsl(var(--foreground))" }
                  }
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert [&_p]:m-0 [&_p]:mb-1.5 [&_ul]:mt-1 [&_ol]:mt-1 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mt-1 [&_h2]:mb-1 [&_strong]:text-white">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="w-2 h-2 rounded-full animate-bounce"
                          style={{ background: "hsl(220 80% 60%)", animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick chips after conversation started */}
          {messages.length > 0 && messages.length < 8 && !loading && (
            <div className="px-3 pb-1 flex gap-1.5 overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>
              {["Best time to visit 📅", "Budget tips 💰", "Hidden gems 💎"].map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-[10px] px-2.5 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "hsl(var(--muted-foreground))" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask about India travel..."
                className="flex-1 px-3.5 py-2.5 rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => { e.currentTarget.style.border = "1px solid hsl(220 80% 50% / 0.5)"; }}
                onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; }}
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl transition-all disabled:opacity-40 hover:scale-105"
                style={{ background: "linear-gradient(135deg, hsl(220 80% 50%), hsl(28 90% 55%))" }}
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpChat {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
