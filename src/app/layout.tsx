import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScrollFix from "@/components/SmoothScrollFix";
import MouseFollower from "@/components/MouseFollower";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alastier C. | AI Automation Engineer & Full Stack Developer",
  description: "Bridge the gap between complex AI and your business. Alastier C. builds reliable, custom-engineered AI agents and automations using n8n, GoHighLevel, and Next.js.",
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180' }
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-foreground selection:text-background`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Alastier Catayoc",
              "jobTitle": "AI Automation Engineer & Full Stack Developer",
              "email": "alastier.catayoc@gmail.com",
              "url": "https://alastierc.com",
              "sameAs": [
                "https://www.linkedin.com/in/alastier-catayoc-aa9521179/",
                "https://www.upwork.com/freelancers/~01bcbb0b3af0b3bf12",
                "https://www.onlinejobs.ph/jobseekers/info/4178429"
              ],
              "knowsAbout": [
                "Flutter", "PHP", "Python", "Next.js", "n8n", "GoHighLevel", "Supabase", "OpenAI", "RAG architecture"
              ],
              "worksFor": [
                { "@type": "Organization", "name": "AutomateWell" },
                { "@type": "Organization", "name": "AgentGenius.ai" },
                { "@type": "Organization", "name": "Cloudesk Pty Ltd" },
                { "@type": "Organization", "name": "MAIS Corporation" }
              ]
            })
          }}
        />
        <SmoothScrollFix />
        <MouseFollower />
        <div className="max-w-4xl mx-auto px-6 py-6 md:py-12">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>

    </html>
  );
}
