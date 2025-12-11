import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SpotlightItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

const spotlightItems: SpotlightItem[] = [
  {
    id: 1,
    title: "Skiing",
    image: "/playground/Skien.JPG",
    description:
      "I have been skiing since I was a child basically from the moment I could stand on skis. Although I no longer go every single year, I still enjoy it immensely. In the past, I went on school ski trips with Intersoc and won several medals in the internal competitions they organized.",
  },
  {
    id: 2,
    title: "Scouts",
    image: "/playground/scouts.webp",
    description:
      "I have been involved in the Scouts since I was very young and have remained active until 2025. I served as a leader for four years, including one year as JIN leader. In addition, I spent three years as treasurer and one year as group leader. Over the years, I have co-organized countless events and contributed to their growth.",
  },
  {
    id: 3,
    title: "Indoor Soccer",
    image: "/playground/indoor_soccer.jpg",
    description:
      `Since 2021, I have been playing indoor soccer with friends in the LZV Cup. We founded the team purely for fun and to stay active. In the 2024–2025 season, we achieved promotion. My statistics can be found here: https://www.lzvcup.be/player/16148`,
  },
  {
    id: 4,
    title: "Cycling",
    image: "/playground/cycling.webp",
    description:
      "When I was about sixteen, I bought my first road bike and started cycling with my father. A bit later, I upgraded to a better bike and joined my fathers cycling club together with two friends. I cycled with the club for about a year, and nowadays I still go out for rides occasionally, either with friends or with my dad."
  },
  {
    id: 5,
    title: "Festivals",
    image: "/playground/festival.webp",
    description:
      "I have been attending music festivals for several years now. My first Rock Werchter was just before the COVID period, and I have not missed an edition since. I have also been to Pukkelpop once, as well as multiple editions of Werchter Boutique and Werchter Classic.",
  },
];

export default function StickyDynamicHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);



  const [activeIndex, setActiveIndex] = useState(0);

  // ScrollTrigger per section
  useEffect(() => {
    const sections = gsap.utils.toArray(".spotlight-section") as HTMLElement[];

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });
  }, []);

  useEffect(() => {
    if (!highlightRef.current) return;

    gsap.fromTo(
      highlightRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, [activeIndex]);


  // Hero animations on activeIndex change
  useEffect(() => {
    if (!bgRef.current || !titleRef.current || !descRef.current) return;

    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        if (bgRef.current) bgRef.current.src = spotlightItems[activeIndex].image;
      },
    });
    gsap.to(bgRef.current, { opacity: 1, duration: 0.5, delay: 0.3 });

    gsap.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    gsap.fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1 });

    if (accentRef.current) gsap.fromTo(accentRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6 });
  }, [activeIndex]);

  // Mouse parallax
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current || !bgRef.current || !accentRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(bgRef.current, { x: px * 20, y: py * 15, scale: 1.02, duration: 0.8, ease: "power2.out" });
      gsap.to(accentRef.current, { x: px * -25, y: py * -18, duration: 0.9, ease: "power2.out" });
    };

    const handleLeave = () => {
      if (!bgRef.current || !accentRef.current) return;
      gsap.to(bgRef.current, { x: 0, y: 0, scale: 1, duration: 0.9, ease: "power3.out" });
      gsap.to(accentRef.current, { x: 0, y: 0, duration: 0.9, ease: "power3.out" });
    };

    heroRef.current?.addEventListener("mousemove", handleMove);
    heroRef.current?.addEventListener("mouseleave", handleLeave);

    return () => {
      heroRef.current?.removeEventListener("mousemove", handleMove);
      heroRef.current?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    tl.from(titleRef.current, { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
  }, []);

  return (
    <div className="relative">
      {/* Sticky Hero */}
      <div
        ref={heroRef}
        className="sticky top-0 z-20 h-screen w-full overflow-hidden bg-gray-900 text-white flex items-center"
      >
        <img
          ref={bgRef}
          src={spotlightItems[activeIndex].image}
          alt={spotlightItems[activeIndex].title}
          className="absolute inset-0 h-full w-full object-cover opacity-90 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70" />

        {/* Snow / Particle Layer */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-full animate-snow" aria-hidden />
        </div>

        {/* Hero content (midden-links) */}
        <div className="relative z-10 max-w-2xl px-6 lg:px-12 flex flex-col justify-center h-full bg-black/75 ">
          <div ref={accentRef} className="mb-6 h-1 w-20 bg-white/80 rounded" />
          <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 drop-shadow-md">
            {spotlightItems[activeIndex].title}
          </h2>
          <p ref={descRef} className="text-white/85 text-lg sm:text-xl max-w-lg">
            {spotlightItems[activeIndex].description}
          </p>
        </div>

        {/* Highlight Card Right */}
        <aside className="hidden lg:block top-1/3 mx-auto w-sm rounded-2xl bg-black/60 backdrop-blur-md p-5 text-white">
          <div className="mb-3 text-2xl font-semibold text-center underline font-alt">Highlights</div>
          <ul className="space-y-2 text-sm text-white/85 list-disc list-inside">
            {activeIndex === 0 && (
              <>
                <li className="text-lg font-alt">Childhood skiing & competitive school trips</li>
                <li className="text-lg font-alt">Medals in interschool races</li>
                <li className="text-lg font-alt">Authentic alpine routes & technique</li>
              </>
            )}
            {activeIndex === 1 && (
              <>
                <li className="text-lg font-alt">4 years as scout leader</li>
                <li className="text-lg font-alt">Group leader & treasurer</li>
                <li className="text-lg font-alt">Co-organized many events</li>
              </>
            )}
            {activeIndex === 2 && (
              <>
                <li className="text-lg font-alt">Indoor soccer fun team</li>
                <li className="text-lg font-alt">2024–2025 promoted</li>
                <li className="text-lg font-alt">Team stats available online</li>
              </>
            )}
            {activeIndex === 3 && (
              <>
                <li className="text-lg font-alt">Joined father&apos;s cycling club</li>
                <li className="text-lg font-alt">Road biking adventures</li>
                <li className="text-lg font-alt">Occasional rides with friends & family</li>
              </>
            )}
            {activeIndex === 4 && (
              <>
                <li className="text-lg font-alt">Rock Werchter veteran</li>
                <li className="text-lg font-alt">Pukkelpop & Boutique editions</li>
                <li className="text-lg font-alt">Festival enthusiast</li>
              </>
            )}
          </ul>
        </aside>

        {/* Progress Indicator (links onder) */}
        <div className="absolute bottom-12 left-6 text-sm font-medium">
          <span className="inline-block transition-all duration-500 ease-out text-4xl font-semibold">
            {activeIndex + 1}/{spotlightItems.length}
          </span>
        </div>
      </div>

      {/* Empty Scroll Sections */}
      <div className="relative z-0">
        {spotlightItems.map((item) => (
          <section key={item.id} className="spotlight-section h-screen w-full" />
        ))}
      </div>

      <style jsx>{`
        /* Subtle snow animation */
        @keyframes snow-fall {
          0% { transform: translateY(-10%) translateX(0); opacity: 0 }
          10% { opacity: 0.6 }
          100% { transform: translateY(110%) translateX(30%); opacity: 0 }
        }

        .animate-snow::after {
          content: '';
          position: absolute;
          inset: -10% -10% -10% -10%;
          background-image:
            radial-gradient(circle at 10% 20%, rgba(255,255,255,0.08) 0.5px, transparent 1px),
            radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0.5px, transparent 1px),
            radial-gradient(circle at 80% 60%, rgba(255,255,255,0.05) 0.5px, transparent 1px);
          background-size: 6px 6px, 8px 8px, 10px 10px;
          opacity: 0.9;
          animation: snow-fall 18s linear infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
