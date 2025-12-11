"use client"; // belangrijk bij Next.js

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../css/playground/hero.css";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return;

    const bg = heroRef.current.querySelector(".hero-bg");
    const overlay = heroRef.current.querySelector(".hero-overlay");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom+=100 top",
        scrub: true,
        pin: true,
      },
    });

    // background zoom
    tl.to(bg, { scale: 1.25, ease: "none" }, 0);

    // overlay darkening
    tl.to(overlay, { opacity: 0.85, ease: "none" }, 0);

    // title: pop forward then fade
    tl.to(titleRef.current, { scale: 1.08, ease: "power2.out" }, 0)
      .to(titleRef.current, { opacity: 0, scale: 1, ease: "power2.out" }, 0.4);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, []);


  return (
    <>
      <div ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          className="hero-bg absolute inset-0"
          style={{
            backgroundImage: "url('playground/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="hero-overlay absolute inset-0 bg-black/60"></div>


        <h1 ref={titleRef} className="relative z-10 text-6xl lg:text-8xl font-bold text-white text-center">
          Take my life <br /> out of the Code
        </h1>
      </div>

      {/* Extra scrollruimte zodat ScrollTrigger kan activeren */}
      <div className="w-full h-40 clip-diagonal z-20 relative"></div>
      <div className="h-[50vh] flex items-center justify-center">
          <h3 className="text-6xl uppercase font-alt font-semibold">Hobbies</h3>
      </div>
    </>
  );
};

export default HeroSection;
