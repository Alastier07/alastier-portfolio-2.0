"use client";

import { useEffect, useRef } from "react";

export default function MouseFollower() {
  const spiritRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (spiritRef.current) {
        // Move the spirit to exact mouse coordinates
        // We use translate3d for better GPU acceleration
        spiritRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        
        // Make it visible while moving
        spiritRef.current.style.opacity = "1";
      }

      // Hide after no movement
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (spiritRef.current) {
          spiritRef.current.style.opacity = "0";
        }
      }, 300); // Fades out after 300ms of stopping
    };

    // Only add listener if on a device that likely has a mouse (not strictly needed, but good practice)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={spiritRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 transition-all duration-700 ease-out will-change-transform hidden sm:block mix-blend-multiply"
    >
      {/* The wide soft shadow glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-black/10 rounded-full blur-3xl" />
      {/* The medium shadow glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/20 rounded-full blur-2xl" />
      {/* The inner dark core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black/60 rounded-full blur-[1px]" />
    </div>
  );
}
