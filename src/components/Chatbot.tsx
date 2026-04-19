import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

// System prompt for India tourism context
const SYSTEM_PROMPT = `You are an expert India travel guide AI assistant for "Incredible India" tourism platform. 
You help tourists plan trips, discover destinations, understand local culture, food, weather, budget, and safety.
Be friendly, concise, and enthusiastic. Use emojis occasionally. Format responses with markdown when helpful (bullet points, bold for place names).
Focus on Indian states, destinations, temples, beaches, wildlife, heritage sites, hill stations, and practical travel advice.`;

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

const callPollinationsAI = async (messages: Msg[]): Promise<string> => {
  // Format the last few messages for context
  const contextLimit = 6;
  const recentMessages = messages.slice(-contextLimit);

  // Build the message array format supported by the new API
  const payloadMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...recentMessages.map(m => ({
      role: m.role,
      content: m.content
    }))
  ];

  const response = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    body: JSON.stringify({
      messages: payloadMessages,
      model: "openai"
    })
  });

  if (!response.ok) {
    throw new Error(`Pollinations API error: ${response.status}`);
  }

  const text = await response.text();
  // If the API somehow returns the deprecation JSON error as text due to non-200, check it
  if (text.includes("IMPORTANT NOTICE") || text.includes("deprecated")) {
    throw new Error("API Deprecation Error");
  }
  
  return text || "Sorry, I couldn't generate a response. Please try again.";
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
      const reply = await callPollinationsAI(newMessages);
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
