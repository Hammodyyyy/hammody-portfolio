// Central content for the portfolio. Edit copy, projects, and links here.

export const profile = {
  name: "Hammody",
  role: "Roblox UI/UX & Motion Designer",
  discordUrl: "https://discordapp.com/users/608785550656274609",
  discordHandle: ".hammody",
  robloxUrl: "https://www.roblox.com/users/144423870/profile",
  xUrl: "https://x.com/__Hammody",
  siteUrl: "https://hammody.pages.dev",
};

export const navLinks = [
  { ix: "01", label: "About", href: "#about" },
  { ix: "02", label: "Skills", href: "#skills" },
  { ix: "03", label: "Work", href: "#work" },
  { ix: "04", label: "Motion", href: "#motion" },
  { ix: "05", label: "Services", href: "#services" },
];

export const heroStats = [
  { v: "600M+", l: "visits contributed" },
  { v: "120+", l: "ui screens shipped" },
  { v: "6yr", l: "on roblox" },
];

export const skills = [
  {
    icon: "🎛️", title: "UI / UX Design", span: "c-wide", feature: true,
    desc: "Player flows, wireframes and pixel-perfect interfaces — shops, quests, inventories, menus and settings, designed for clarity, speed, and feel.",
    tags: ["Figma", "Wireframing", "UX research", "Hierarchy"],
  },
  {
    icon: "🧩", title: "Design Systems", span: "c-mid",
    desc: "Reusable component libraries, states and tokens so a whole game stays consistent as it scales.",
    tags: ["Components", "Tokens", "States"],
  },
  {
    icon: "✨", title: "UI Animation", span: "c-mid",
    desc: "Tweened menus and micro-interactions that make every tap satisfying.",
    tags: ["Motion", "Juice"],
  },
  {
    icon: "🧭", title: "Prototyping & Flows", span: "c-mid",
    desc: "Interactive prototypes that prove a flow before it's ever built.",
    tags: ["Prototypes", "Flows"],
  },
];

export const projects = [
  {
    img: "/work/shop.jpg", alt: "Shop UI with a Starter Bundle and VIP offer, designed by Hammody",
    kind: "01 — Monetization UI", title: "Shop & Starter Bundle",
    desc: "A high-conversion shop with a bundled starter offer and VIP tier. Strong value framing, a clear price hierarchy, and bold Robux CTAs that guide the eye straight to the buy.",
    tags: ["Bundle layout", "Value framing", "Robux CTAs", "VIP tier"], alt2: false,
  },
  {
    img: "/work/quests.jpg", alt: "Quest system UI with six category tabs, locked quests and a reward picker, designed by Hammody",
    kind: "02 — Systems UI", title: "Quest System",
    desc: "A full quest hub with six categories, a live 24-hour reset, locked and in-progress states, and a reward picker — a lot of information made calm and scannable.",
    tags: ["6 categories", "Locked states", "Reward picker", "Progress"], alt2: true,
  },
  {
    img: "/work/kitchen.jpg", alt: "Kitchen crafting UI with a six-flavor stat system, modifier slots and a cook action, designed by Hammody",
    kind: "03 — Crafting UI", title: "Kitchen / Cooking",
    desc: "A deep crafting screen with a six-flavor stat system, modifier slots, a star-rated result and a satisfying \u201cCook\u201d moment — complex mechanics turned into something a player reads instantly.",
    tags: ["6-flavor system", "Modifier slots", "Star rating", "Glassmorphism"], alt2: false,
  },
  {
    img: "/work/store.jpg", alt: "Tabbed store UI with bundle tiers and a gifting panel, designed by Hammody",
    kind: "04 — Store & Gifting", title: "Store & Gifting",
    desc: "A tabbed store — Special, Gamepasses, Cases, Boosts — with 1x/3x/10x bundle tiers and a side gifting panel, so buying for yourself or a friend both feel effortless.",
    tags: ["4 tabs", "Bundle tiers", "Gifting", "Cases & boosts"], alt2: true,
  },
];

export const motionPoints = [
  { b: "Tweened menus & transitions", i: "panels that open, slide and settle with the right easing." },
  { b: "Satisfying feedback", i: "hover, press and claim states that reward every tap." },
  { b: "Juicy rewards", i: "pops, counters and effects that make progress feel good." },
  { b: "Performance-safe", i: "smooth in a live game full of real players, not just in a preview." },
];

export const services = [
  { n: "01", name: "UI/UX Design", desc: "Flows, wireframes and pixel-perfect screens tuned for clarity and retention." },
  { n: "02", name: "UI Animation", desc: "Tweened menus and micro-interactions that make your UI feel expensive." },
  { n: "03", name: "Design Systems", desc: "Component libraries and states that keep your whole game consistent." },
  { n: "04", name: "Prototyping & Flows", desc: "Interactive prototypes that prove a flow before it's built." },
];

export const whyCards = [
  { icon: "\u26a1", title: "Fast, and on time", desc: "Quick turnarounds without cutting corners. \u201cFast & efficient\u201d and \u201calways delivers on time\u201d is the feedback I hear most." },
  { icon: "\ud83d\udd04", title: "Revised until it's right", desc: "I iterate with you through every edit until the UI feels exactly how you want it — no complaints, no ego, no nickel-and-diming." },
  { icon: "\ud83d\ude80", title: "Built to ship", desc: "Real UI for live Roblox games with 600M+ visits behind it — clear, readable, and ready to drop straight in. Not just pretty mockups." },
];

export const testimonials = [
  {
    big: true, initial: "T", avatar: "/avatars/tangerine.gif", name: "@Tangerine", role: "UI commission · Discord vouch",
    quote: "Highly recommend Hammody for your UIs. He was very fast and efficient, and he communicated with me frequently throughout the entire process. I asked for a lot of revisions and edits while he was making the UI, and he implemented every single one without complaint. He was very patient with me and even checked up on me after the commission was done to make sure I was happy with it. You really can't get better than this!",
  },
  {
    initial: "C", avatar: "/avatars/cyy.gif", name: "@CYY", role: "UI commission · Discord vouch",
    quote: "Fast & efficient with good quality.",
  },
  {
    initial: "A", avatar: "/avatars/aomine.webp", name: "@aomine", role: "UI commission · Discord vouch",
    quote: "Hammody provided me quality work and always delivers on time! He is great to work with and is amazing at what he does — I highly recommend him.",
  },
];

export const socials = [
  { label: "Discord — .hammody", href: profile.discordUrl },
  { label: "Roblox — H4MMODY", href: profile.robloxUrl },
  { label: "X — @__Hammody", href: profile.xUrl },
];
