import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/chat` : "/api/chat";

const SUGGESTIONS = [
  "Best beaches in AP 🏖️",
  "Tell me about Araku Valley",
  "Plan a 5-day trip 🗺️",
  "Budget for Tirupati 💰",
  "AP emergency numbers 🚨",
  "Best food in Andhra",
  "Cultural destinations 🛕",
  "Compare Gandikota vs Horsley Hills",
];

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
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!resp.ok) throw new Error("Failed to get response");

      const data = await resp.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't understand that.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting to the backend server. Please make sure the API is online.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleSend = () => {
    if (input.trim()) sendMessage(input.trim());
  };

  const resetChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
        }}
        aria-label="Open chatbot"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[560px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between shrink-0"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">
                  AP Trail Guide
                </p>
                <p className="text-xs text-white/70">AI-powered • Ask anything</p>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="text-white/70 hover:text-white transition-colors p-1"
              title="Reset chat"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {/* Empty state with suggestions */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f120, #a855f720)",
                  }}
                >
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Hi! I'm your AP Travel Guide 🌟
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Powered by AI • Ask anything about Andhra Pradesh tourism
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {SUGGESTIONS.slice(0, 6).map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                  style={
                    msg.role === "user"
                      ? {
                          background:
                            "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        }
                      : undefined
                  }
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert [&_p]:m-0 [&_p]:mb-1.5 [&_ul]:mt-1 [&_ol]:mt-1 [&_h2]:text-base [&_h2]:mt-0 [&_h2]:mb-1">
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
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions after messages */}
          {messages.length > 0 && messages.length < 6 && !loading && (
            <div className="px-3 pb-1 flex gap-1 overflow-x-auto shrink-0">
              {["Best time to visit 📅", "Budget tips 💰", "Emergency numbers 🚨"]
                .map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[10px] px-2 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors whitespace-nowrap shrink-0"
                  >
                    {s}
                  </button>
                ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3 shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask anything about AP tourism..."
                className="flex-1 px-3 py-2 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl text-white transition-all disabled:opacity-40 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
