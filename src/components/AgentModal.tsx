"use client";

import { X, Send, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentModal({ isOpen, onClose }: AgentModalProps) {
  const [messages, setMessages] = useState<{ role: "user" | "agent"; text: string }[]>([
    { role: "agent", text: "Hello! I'm Aries, Alastier's AI Agent. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Create a stable session ID for this user's conversation
  const sessionIdRef = useRef(`session-${Math.random().toString(36).substring(2, 10)}`);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isOpen) return null;

  const suggestions = [
    "How can I get in touch with Alastier for a project?",
    "Could you summarize Alastier's core technical expertise and professional background?",
    "What is the story behind the name Aries for this AI agent?"
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsLoading(true);

    try {
      // Call the Next.js API route that handles n8n + rate limiting
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text, 
          sessionId: sessionIdRef.current 
        }),
      });

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: data.response || "Something went wrong." }
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: "I'm having trouble connecting to my brain right now. Please try again later!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMsg = input;
    setInput("");
    await sendMessage(userMsg);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-foreground text-background rounded-full">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground tracking-tight">Agent Aries</h3>
              <p className="text-xs text-muted">Online</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-muted hover:text-foreground hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-foreground text-background rounded-br-sm" 
                    : "bg-zinc-100 text-foreground rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {messages.length === 1 && !isLoading && (
            <div className="flex flex-col gap-2 mt-4 items-end animate-in fade-in slide-in-from-bottom-2">
              <span className="text-xs text-muted mb-1 mr-2">Suggested questions:</span>
              {suggestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm bg-background border border-border hover:bg-zinc-50 text-foreground px-4 py-2.5 rounded-2xl rounded-br-sm transition-colors max-w-[85%] shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-100 text-foreground rounded-2xl rounded-bl-sm px-4 py-3 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form 
            onSubmit={handleSend}
            className="flex items-center gap-2 bg-zinc-50 border border-border rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-foreground focus-within:ring-offset-1 transition-all"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "Aries is typing..." : "Ask Aries anything..."}
              disabled={isLoading}
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 text-background bg-foreground rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
