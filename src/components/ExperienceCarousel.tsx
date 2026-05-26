"use client";

import { Experience } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function ExperienceCarousel({ experiences }: { experiences: Experience[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -450, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 450, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Controls */}
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-background border border-border shadow-md rounded-full text-foreground hover:bg-zinc-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden sm:flex"
        aria-label="Previous experience"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-background border border-border shadow-md rounded-full text-foreground hover:bg-zinc-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden sm:flex"
        aria-label="Next experience"
      >
        <ChevronRight size={20} />
      </button>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {experiences.map((exp) => (
          <div 
            key={exp.id} 
            className="flex-none w-[85vw] sm:w-[450px] snap-center sm:snap-start bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-foreground/20 transition-colors"
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-foreground text-background text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
                {exp.start_date} - {exp.end_date}
              </span>
              <h3 className="text-xl font-bold tracking-tight mb-1">{exp.role}</h3>
              <p className="text-muted font-medium">{exp.company}</p>
            </div>
            
            <ul className="space-y-3">
              {exp.description.map((item, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed flex gap-3">
                  <span className="text-foreground/40 mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
