"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// One vocabulary for the whole site: masks snap out fast and settle, everything
// else shares a single decelerating curve. Consistency is what reads as "intentional".
const EASE_MASK = "expo.out";
const EASE_REVEAL = "power3.out";
const HOVER_TARGETS = "a,button,[data-cursor],.svc-row,.cell,.why,.q";
// Must exceed 100% + the .clip bottom overhang (.18em on a .98em line ≈ 18%),
// or a sliver of the line peeks below the mask before it moves.
const MASK_TRAVEL = 128;

// Progress bars scale instead of animating width — a transform composites,
// a width change relayouts on every scroll frame.
const scaleXSetter = (el) => (v) => { el.style.transform = `scaleX(${v})`; };

export default function SiteEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(any-pointer: fine)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let lenis = null;
    let cancelled = false;
    const cleanups = [];
    const timers = [];
    cleanups.push(() => { cancelled = true; });

    // ---------- Smooth scroll ----------
    if (!reduce) {
      try {
        lenis = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => gsap.ticker.remove(tick));
      } catch (e) {
        lenis = null;
      }
    }

    const nav = document.getElementById("nav");
    const navLinks = document.getElementById("navLinks");
    const burger = document.getElementById("burger");
    const closeMenu = () => {
      navLinks && navLinks.classList.remove("open");
      burger && burger.classList.remove("open");
      if (lenis) lenis.start();
    };

    // ---------- Anchor smooth scroll ----------
    const anchorHandlers = [];
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const h = (e) => {
        const id = a.getAttribute("href");
        if (!id || id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        closeMenu();
        if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.2 });
        else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      };
      a.addEventListener("click", h);
      anchorHandlers.push([a, h]);
    });
    cleanups.push(() => anchorHandlers.forEach(([a, h]) => a.removeEventListener("click", h)));

    // ---------- Scroll-position UI (runs even with reduced motion) ----------
    const buildScrollUI = () => {
      const navProg = document.getElementById("navProg");
      if (navProg) {
        const setProg = scaleXSetter(navProg);
        ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => setProg(self.progress) });
      }

      document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)').forEach((link) => {
        const id = link.getAttribute("href");
        if (!id || id.length < 2) return;
        const sec = document.querySelector(id);
        if (!sec) return;
        ScrollTrigger.create({
          trigger: sec,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => link.classList.toggle("active", self.isActive),
        });
      });
    };

    // ---------- Scroll-driven motion ----------
    const buildMotion = () => {
      // Headlines rise out of their own mask, line by line.
      gsap.utils.toArray("[data-lines]").forEach((h) => {
        const lines = h.querySelectorAll(".ln");
        if (!lines.length) return;
        gsap.from(lines, {
          yPercent: MASK_TRAVEL,
          duration: 1.15,
          ease: EASE_MASK,
          stagger: 0.09,
          scrollTrigger: { trigger: h, start: "top 88%", once: true },
        });
      });

      // batch() groups everything crossing the line together, so grid siblings
      // stagger as a set instead of each firing its own identical tween.
      ScrollTrigger.batch(".reveal", {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.95, ease: EASE_REVEAL, stagger: 0.085 }),
      });

      gsap.utils.toArray("[data-float]").forEach((el) => {
        const d = parseFloat(el.getAttribute("data-float")) || 1;
        gsap.to(el, {
          yPercent: -7 * d,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width:901px) and (prefers-reduced-motion: no-preference)", () => {
        const track = document.getElementById("track");
        const bar = document.getElementById("scBar");
        if (!track) return;

        // Functional values, re-read on every refresh — a captured number goes
        // stale the moment the viewport resizes.
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
        const setBar = bar ? scaleXSetter(bar) : null;

        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: "#work",
            start: "top top",
            end: () => "+=" + dist(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => { if (setBar) setBar(0.12 + self.progress * 0.88); },
          },
        });

        return () => {
          if (tween.scrollTrigger) tween.scrollTrigger.kill();
          tween.kill();
          gsap.set(track, { x: 0 });
        };
      });
      cleanups.push(() => mm.revert());

      // Late-loading images change section heights; re-measure when they land.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      cleanups.push(() => window.removeEventListener("load", onLoad));
    };

    // ---------- Hero entrance ----------
    // Built paused so from() stages the start state behind the loader.
    const buildHeroTl = () => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE_REVEAL } });
      tl.from(".hero .eyebrow", { opacity: 0, y: 14, duration: 0.7 }, 0)
        .from(".hero h1 .ln", { yPercent: MASK_TRAVEL, duration: 1.2, ease: EASE_MASK, stagger: 0.1 }, 0.06)
        .from(".hero-ui", { y: 64, opacity: 0, duration: 1.2 }, 0.18)
        // Direct children only: `.hero-meta div` would also match .v and .l,
        // double-applying the fade and stretching the stagger across 9 nodes.
        .from(".hero-meta > div", { y: 22, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.5)
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, 0.62)
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.7 }, 0.72)
        .from(".hero-chip", { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2)" }, 0.85)
        .from(".scroll-hint", { opacity: 0, duration: 0.6 }, 1.0);
      return tl;
    };

    // ---------- Loader ----------
    const loader = document.getElementById("loader");
    const lcount = document.getElementById("lcount");
    const lbar = document.getElementById("lbar");
    const setLoaderBar = lbar ? scaleXSetter(lbar) : null;
    if (lenis) lenis.stop();

    const p = { v: 0 };
    const render = () => {
      if (lcount) lcount.textContent = Math.round(p.v);
      if (setLoaderBar) setLoaderBar(p.v / 100);
    };

    const finish = () => {
      if (cancelled) return;

      if (reduce) {
        // Reduced motion is handled entirely in CSS; nothing here is staged,
        // so there is nothing to animate back in.
        buildScrollUI();
        ScrollTrigger.refresh();
        if (loader) loader.style.display = "none";
        if (lenis) lenis.start();
        return;
      }

      // Pinning #work changes the page's scroll length, so it must exist before
      // the nav progress/active-link triggers measure against it.
      buildMotion();
      buildScrollUI();
      ScrollTrigger.refresh();

      const hero = buildHeroTl();

      const out = gsap.timeline({
        onComplete: () => {
          if (loader) { loader.style.display = "none"; loader.style.pointerEvents = "none"; }
        },
      });
      out.to(".loader .lg, .loader-track, .loader .cap", {
          y: -26, opacity: 0, duration: 0.5, ease: "power2.in", stagger: 0.05,
        })
        .to(loader, { yPercent: -100, duration: 1.05, ease: "power4.inOut" }, "-=0.2")
        .add(() => { if (lenis) lenis.start(); }, "<")
        // Hero begins while the loader is still clearing — the overlap is what
        // makes the handoff feel like one movement instead of two.
        .add(() => hero.play(), "<+=0.28");
    };

    if (reduce) {
      p.v = 100;
      render();
      finish();
    } else {
      // Climb to 90 on a curve, then let real readiness close the last 10 —
      // never stalls, never lies about being done.
      const climb = gsap.to(p, { v: 90, duration: 1.05, ease: "power2.out", onUpdate: render });

      const ready = new Promise((res) => {
        if (document.readyState === "complete") res();
        else window.addEventListener("load", res, { once: true });
      });
      const cap = new Promise((res) => timers.push(setTimeout(res, 2000)));
      const floor = new Promise((res) => timers.push(setTimeout(res, 900)));

      Promise.all([Promise.race([ready, cap]), floor]).then(() => {
        if (cancelled) return;
        climb.kill();
        gsap.to(p, { v: 100, duration: 0.45, ease: "power2.inOut", onUpdate: render, onComplete: finish });
      });
    }
    cleanups.push(() => timers.forEach(clearTimeout));

    // ---------- Nav scroll state ----------
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle("small", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // ---------- Mobile menu ----------
    if (burger && navLinks) {
      const onBurger = () => {
        if (navLinks.classList.contains("open")) {
          closeMenu();
        } else {
          navLinks.classList.add("open");
          burger.classList.add("open");
          if (lenis) lenis.stop();
        }
      };
      burger.addEventListener("click", onBurger);
      cleanups.push(() => burger.removeEventListener("click", onBurger));
    }

    // ---------- Ambient spotlight ----------
    const spot = document.getElementById("spot");
    if (spot && fine && !reduce) {
      gsap.set(spot, {
        xPercent: -50, yPercent: -50,
        x: window.innerWidth * 0.7, y: window.innerHeight * 0.2,
      });
      document.body.classList.add("spot-on");
      const sx = gsap.quickTo(spot, "x", { duration: 0.9, ease: "power3" });
      const sy = gsap.quickTo(spot, "y", { duration: 0.9, ease: "power3" });
      const onSpot = (e) => { sx(e.clientX); sy(e.clientY); };
      window.addEventListener("pointermove", onSpot, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onSpot);
        document.body.classList.remove("spot-on");
      });
    }

    // ---------- Custom cursor ----------
    const dot = document.getElementById("dot");
    const ring = document.getElementById("ring");
    if (fine && !reduce && dot && ring) {
      document.body.classList.add("cursor-on");
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: cx, y: cy });

      const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
      const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
      const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
      const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

      // One delegated listener replaces two per interactive element, and it
      // keeps working for anything added to the DOM later.
      let hovered = null;
      const onMove = (e) => {
        dx(e.clientX); dy(e.clientY);
        rx(e.clientX); ry(e.clientY);
        const el = e.target instanceof Element ? e.target.closest(HOVER_TARGETS) : null;
        if (el !== hovered) {
          hovered = el;
          ring.classList.toggle("hover", !!el);
          // Scale rather than width/height: keeps the ring centred under the
          // pointer instead of drifting as the box grows.
          gsap.to(ring, { scale: el ? 1.9 : 1, duration: 0.4, ease: "power3.out" });
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        document.body.classList.remove("cursor-on");
      });

      // ---------- Magnetic buttons ----------
      const magHandlers = [];
      document.querySelectorAll(".magnetic").forEach((b) => {
        const move = (e) => {
          const r = b.getBoundingClientRect();
          gsap.to(b, {
            x: (e.clientX - (r.left + r.width / 2)) * 0.32,
            y: (e.clientY - (r.top + r.height / 2)) * 0.42,
            duration: 0.55, ease: "power3.out",
          });
        };
        const out = () => gsap.to(b, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,.45)" });
        b.addEventListener("pointermove", move);
        b.addEventListener("pointerleave", out);
        magHandlers.push([b, move, out]);
      });
      cleanups.push(() =>
        magHandlers.forEach(([b, mv, ml]) => {
          b.removeEventListener("pointermove", mv);
          b.removeEventListener("pointerleave", ml);
        })
      );

      // ---------- Pointer-tracked card highlight ----------
      const glowHandlers = [];
      document.querySelectorAll(".bento,.why-grid").forEach((grid) => {
        const onGlow = (e) => {
          const card = e.target instanceof Element ? e.target.closest(".cell,.why") : null;
          if (!card) return;
          const r = card.getBoundingClientRect();
          card.style.setProperty("--cx", e.clientX - r.left + "px");
          card.style.setProperty("--cy", e.clientY - r.top + "px");
        };
        grid.addEventListener("pointermove", onGlow, { passive: true });
        glowHandlers.push([grid, onGlow]);
      });
      cleanups.push(() => glowHandlers.forEach(([g, h]) => g.removeEventListener("pointermove", h)));
    }

    // ---------- Cleanup ----------
    return () => {
      cleanups.forEach((fn) => { try { fn(); } catch (e) {} });
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (lenis) { try { lenis.destroy(); } catch (e) {} }
    };
  }, []);

  return null;
}
