"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AgentModal from "./AgentModal";

export default function Navbar() {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleOpen = () => setIsAgentOpen(true);
    window.addEventListener("open-agent", handleOpen);
    return () => window.removeEventListener("open-agent", handleOpen);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 -mt-6 pt-6 pb-8 mb-4 bg-gradient-to-b from-background via-background/95 to-transparent">
        <nav className="flex justify-between items-center max-w-4xl mx-auto bg-foreground text-background px-5 md:px-6 py-4 rounded-2xl shadow-lg relative">
          <Link href={isHome ? "#about" : "/"} className="font-bold text-lg tracking-tight z-10">
            Alastier C.
          </Link>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-background/80">
            {isHome ? (
              <>
                <li><Link href="#projects" className="hover:text-white transition-colors">Projects</Link></li>
                <li><Link href="#skills" className="hover:text-white transition-colors">Skills</Link></li>
                <li><Link href="#experience" className="hover:text-white transition-colors">Experience</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </>
            ) : (
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            )}
            <li className="pl-2 border-l border-background/20">
              <button
                onClick={() => setIsAgentOpen(true)}
                className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Agent Aries
              </button>
            </li>
          </ul>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-background/80 hover:text-white transition-colors z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 p-5 bg-foreground rounded-2xl shadow-xl flex flex-col gap-4 border border-zinc-800 md:hidden animate-in slide-in-from-top-2 z-50">
              <ul className="flex flex-col gap-5 text-base font-medium text-background/80">
                {isHome ? (
                  <>
                    <li><Link href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-white transition-colors">Projects</Link></li>
                    <li><Link href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-white transition-colors">Skills</Link></li>
                    <li><Link href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-white transition-colors">Experience</Link></li>
                    <li><Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-white transition-colors">Contact</Link></li>
                  </>
                ) : (
                  <li><Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-white transition-colors">Home</Link></li>
                )}
                <li className="pt-4 border-t border-background/20">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAgentOpen(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-3 rounded-full transition-colors text-base"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Meet Agent Aries
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <AgentModal isOpen={isAgentOpen} onClose={() => setIsAgentOpen(false)} />
    </>
  );
}
