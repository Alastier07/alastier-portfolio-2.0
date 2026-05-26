"use client";

import Link from "next/link";
import { Bot, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="about" className="mb-20 pt-8 scroll-mt-32">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Automation Engineer, AI Agent Manager & Full Stack Developer
      </h1>
      <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
        I bridge the gap between complex AI technology and your daily business operations. You don't need tech buzzwords. You need systems that book appointments, revive slipping deals, and make your business run like a machine. I spent years building secure web apps from the ground up, which means the AI agents and automations I build for you are reliable, custom-engineered tools designed to cut your operational costs and drive real growth.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="#contact"
          className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Let&apos;s Collaborate <ArrowRight size={18} />
        </Link>
        <button
          onClick={() => window.dispatchEvent(new Event("open-agent"))}
          className="inline-flex items-center justify-center gap-2 bg-zinc-100 text-foreground px-6 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors border border-border"
        >
          <Bot size={18} /> Meet My AI Agent
        </button>
      </div>
    </section>
  );
}
