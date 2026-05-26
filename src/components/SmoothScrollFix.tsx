"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScrollFix() {
  const pathname = usePathname();

  useEffect(() => {
    // Force instant scroll to top on route change to prevent smooth scrolling from 
    // carrying over from the previous page's scroll position.
    document.documentElement.classList.remove("scroll-smooth");
    window.scrollTo(0, 0);
    
    // Use a small delay to ensure the DOM has updated before re-enabling smooth scroll
    const timeout = setTimeout(() => {
      document.documentElement.classList.add("scroll-smooth");
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
