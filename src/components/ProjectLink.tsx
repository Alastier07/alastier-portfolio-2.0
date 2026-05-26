"use client";

import { ExternalLink } from "lucide-react";

interface ProjectLinkProps {
  title: string;
  link: string;
}

export default function ProjectLink({ title, link }: ProjectLinkProps) {
  if (title === "Intelligent Portfolio AI Agent") {
    return (
      <button
        onClick={() => window.dispatchEvent(new Event("open-agent"))}
        className="text-muted hover:text-foreground transition-colors"
        aria-label="Open AI Agent"
        title="Chat with Agent Aries"
      >
        <ExternalLink size={18} />
      </button>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted hover:text-foreground transition-colors"
    >
      <ExternalLink size={18} />
    </a>
  );
}
