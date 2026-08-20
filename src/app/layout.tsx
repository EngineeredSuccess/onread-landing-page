import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://onread.app'),
  title: "OnRead — AI Judge for Toxic Chats & Dating Disasters",
  description:
    "Stop overthinking. Start checking. Drop the screenshot, get your Aura Score. The brutally honest AI judge for group chats and dating app cringe.",
  keywords: [
    "aura score",
    "onread",
    "text roast ai",
    "screenshot judge",
    "dating app roast",
    "group chat roast",
    "gen z ai",
  ],
  openGraph: {
    title: "OnRead — Stop Overthinking. Start Checking.",
    description: "The AI judge for your toxic group chats and dating app disasters. Drop the screenshot, get your Aura Score.",
    type: "website",
    url: "https://onread.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OnRead Aura Score Judge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnRead — Stop Overthinking. Start Checking.",
    description: "The AI judge for your toxic group chats and dating app disasters. Drop the screenshot, get your Aura Score.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} dark`}
    >
      <body className="bg-[#0A0A0A] text-white font-sans antialiased min-h-screen selection:bg-[#FF006E] selection:text-white flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
