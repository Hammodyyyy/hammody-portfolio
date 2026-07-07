"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SiteEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let lenis = null;
    let rafId = 0;
    const cleanups = [];

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

    // ---------- Loader ----------
    const loader = document.getElementById("loader");
    const lc = document.getElementById("lcount");
    const lb = document.getElementById("lbar");
    if (lenis) lenis.stop();

    const heroIn = () => {
      if (reduce) {
        document.querySelectorAll(".reveal").forEach((r) => {
          r.style.opacity = 1;
          r.style.transform = "none";
        });
        return;
      }
      const tl = gsap.timeline();
      tl.from(".hero h1 .ln", { yPercent: 115, duration: 1.05, ease: "power4.out", stagger: 0.12 })
        .from(".hero-meta div", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, "-=.55")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=.45")
        .from(".hero-ui", { y: 50, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=.9")
        .from(".hero-chip", { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(2)" }, "-=.4")
        .from(".hero .eyebrow", { opacity: 0, duration: 0.5 }, "-=1.1")
        .from(".scroll-hint", { opacity: 0, duration: 0.5 }, "-=.2");
    };

    const buildScroll = () => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      gsap.utils.toArray(".sec-title").forEach((t) => {
        gsap.from(t, {
          y: 44, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: t, start: "top 90%" },
        });
      });
      gsap.utils.toArray("[data-float]").forEach((el) => {
        const d = parseFloat(el.getAttribute("data-float")) || 1;
        gsap.to(el, {
          yPercent: -7 * d, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width:901px)", () => {
        const track = document.getElementById("track");
        const bar = document.getElementById("scBar");
        if (!track) return;
        const dist = track.scrollWidth - window.innerWidth + 80;
        const tween = gsap.to(track, {
          x: -dist, ease: "none",
          scrollTrigger: {
            trigger: "#work", start: "top top", end: "+=" + dist, scrub: 1,
            pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (self) => { if (bar) bar.style.width = 12 + self.progress * 88 + "%"; },
          },
        });
        return () => {
          if (tween && tween.scrollTrigger) tween.scrollTrigger.kill();
          gsap.set(track, { x: 0 });
        };
      });
      cleanups.push(() => mm.revert());

      ScrollTrigger.refresh();
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      cleanups.push(() => window.removeEventListener("load", onLoad));
    };

    const finish = () => {
      if (reduce) {
        if (loader) loader.style.display = "none";
        if (lenis) lenis.start();
        heroIn();
        buildScroll();
        return;
      }
      gsap.to(loader, {
        yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.15,
        onComplete: () => {
          if (loader) loader.style.display = "none";
          if (lenis) lenis.start();
          heroIn();
          buildScroll();
        },
      });
    };

    if (reduce) {
      if (lc) lc.textContent = "100";
      if (lb) lb.style.width = "100%";
      finish();
    } else {
      const p = { v: 0 };
      gsap.to(p, {
        v: 100, duration: 1.6, ease: "power2.inOut",
        onUpdate: () => {
          const n = Math.round(p.v);
          if (lc) lc.textContent = n;
          if (lb) lb.style.width = n + "%";
        },
        onComplete: finish,
      });
    }

    // ---------- Nav scroll state ----------
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 40) nav.classList.add("small");
      else nav.classList.remove("small");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // ---------- Mobile menu ----------
    const onBurger = () => {
      if (navLinks.classList.contains("open")) {
        closeMenu();
      } else {
        navLinks.classList.add("open");
        burger.classList.add("open");
        if (lenis) lenis.stop();
      }
    };
    if (burger) {
      burger.addEventListener("click", onBurger);
      cleanups.push(() => burger.removeEventListener("click", onBurger));
    }

    // ---------- Ambient spotlight ----------
    const atmos = document.getElementById("atmos");
    const onAtmos = (e) => {
      if (!atmos) return;
      atmos.style.setProperty("--mx", (e.clientX / window.innerWidth) * 100 + "%");
      atmos.style.setProperty("--my", (e.clientY / window.innerHeight) * 100 + "%");
    };
    if (!reduce) {
      window.addEventListener("mousemove", onAtmos, { passive: true });
      cleanups.push(() => window.removeEventListener("mousemove", onAtmos));
    }

    // ---------- Custom cursor + magnetic ----------
    const dot = document.getElementById("dot");
    const ring = document.getElementById("ring");
    const fine = window.matchMedia("(any-pointer: fine)").matches;
    if (fine && !reduce && dot && ring) {
      document.body.classList.add("cursor-on");
      let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;

      const onMove = (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      };
      window.addEventListener("mousemove", onMove);

      const loop = () => {
        rx += (mx - rx) * 0.17;
        ry += (my - ry) * 0.17;
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
        rafId = requestAnimationFrame(loop);
      };
      loop();

      const hoverEls = document.querySelectorAll("[data-cursor],a,button,.svc-row,.cell");
      const enter = () => ring.classList.add("hover");
      const leave = () => ring.classList.remove("hover");
      hoverEls.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });

      const magnets = document.querySelectorAll(".magnetic");
      const magHandlers = [];
      magnets.forEach((b) => {
        const move = (e) => {
          const r = b.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          gsap.to(b, { x: x * 0.35, y: y * 0.5, duration: 0.5, ease: "power3.out" });
        };
        const out = () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,.4)" });
        b.addEventListener("mousemove", move);
        b.addEventListener("mouseleave", out);
        magHandlers.push([b, move, out]);
      });

      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(rafId);
        hoverEls.forEach((el) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
        magHandlers.forEach(([b, mv, ml]) => {
          b.removeEventListener("mousemove", mv);
          b.removeEventListener("mouseleave", ml);
        });
        document.body.classList.remove("cursor-on");
      });
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
