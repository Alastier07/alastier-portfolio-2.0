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
  title: "Alastier Catayoc | AI Automation and Agent Management Specialist",
  description: "A clean, modern portfolio showcasing skills and projects.",
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
