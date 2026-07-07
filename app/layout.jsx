import "./globals.css";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://hammody.pages.dev"),
  title: "Hammody — Roblox UI/UX Designer",
  description:
    "Hammody designs UI/UX for Roblox games — shops, quests, crafting and store interfaces built for clarity, feel, and retention. Selected work and contact.",
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    type: "website",
    url: "https://hammody.pages.dev/",
    title: "Hammody — Roblox UI/UX Designer",
    description: "Interfaces players feel. Roblox UI/UX design — shops, quests, crafting, stores.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hammody — Roblox UI/UX Designer",
    description: "Interfaces players feel. Roblox UI/UX & motion design — shops, quests, crafting, stores.",
    images: ["/og.png"],
  },
};

export const viewport = {
  themeColor: "#08070c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
