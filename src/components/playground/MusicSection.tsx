"use client";
import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularVisualizer from "./CircularVisualizer";
import WrappedGrid from "./WrappedGrid";

gsap.registerPlugin(ScrollTrigger);

export default function MusicSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const playButtonRef = useRef<HTMLButtonElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);

    // hide button
    gsap.to(playButtonRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 0.5,
      ease: "power4.inOut",
      pointerEvents: "none",
    });

    // reveal text
    gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      delay: 0.2,
      duration: 1.2,
      ease: "power3.out",
    });
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Title & Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide">
            My Musical Journey
          </h1>
          <p className="mt-3 text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
            The soundtrack of my life, moments captured in rhythms and beats.
          </p>
        </div>

        {/* Circular Visualizer */}
        <div className="relative w-[340px] h-[340px]">
          <CircularVisualizer isPlaying={isPlaying} />

          {!isPlaying && (
            <button
              ref={playButtonRef}
              onClick={handlePlay}
              className="absolute inset-0 m-auto h-24 w-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xl font-semibold transition hover:bg-white/20"
            >
              Play
            </button>
          )}
        </div>

        {/* Text that appears when playing */}
        <div
          ref={textRef}
          className="opacity-0 translate-y-4 mt-10 text-center max-w-xl text-lg text-gray-300"
        >
          Over the past few years, music has become an increasingly important part of my life. In 2025 alone, I’ve spent nearly 75k minutes listening on Spotify. I truly believe music has the power to bring energy, create calm, connect people, and spark motivation. It’s a force that shapes moods, inspires creativity, and brings moments to life.
        </div>
      </section>

      {/* Wrapped Grid Section */}
      <WrappedGrid />
    </>
  );
}
