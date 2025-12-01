"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "@/animations/gsapSetup";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    { title: "Wild Wines", category: "E-commerce Website", smallDescription: "A e-commerce platform for wine enthusiasts.", image: "/projects/wineyard.jpeg" },
    { title: "Petanque Tournament", category: "Tournament Application", smallDescription: "An app to manage petanque tournaments efficiently.", image: "/projects/petanqueTornooi.jpg" },
    { title: "TournaFlow", category: "Tournament Application", smallDescription: "A comprehensive tournament management system.", image: "/projects/tournaflow.svg" },
  ];

  useLayoutEffect(() => {
    gsap.utils.toArray(".project-card").forEach((card: any, i: number) => {
      gsap.from(card, {
        opacity: 0.7,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });

      // Subtle floating
      gsap.to(card, {
        y: "+=8",
        opacity: 1,
        repeat: -1,
        yoyo: true,
        duration: 2 + i/10,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <>
      <section className="projects-header">
        <h1 className="projects-title">I don’t build websites. I build digital experiences.</h1>
        <p className="projects-subtitle">
          A collection of digital experiences crafted with direction, precision, and a heavy obsession for detail.
        </p>
      </section>

      <section className="projects-grid">
        {projects.map((p, i) => (
         <div
            key={i} 
            className="project-card hover-card"
            ref={(el) => { cardsRef.current[i] = el; }}
          >
            <div className="hover-image">
              <img src={p.image} alt={p.title} />
            </div>

            <div className="red-tint"></div>   {/* 🔴 nieuw */}

            <div className="hover-overlay"></div>


            {/* ALWAYS VISIBLE TITLE + CATEGORY */}
            <div className="initial-info">
              <p className="initial-category">{p.category}</p>
              <h3 className="initial-title">{p.title}</h3>
            </div>

            {/* FULL HOVER CONTENT */}
            <div className="hover-content">
              <p className="project-category">{p.category}</p>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-description">{p.smallDescription}</p>
              <Link href={`/projects/${p.title.toLowerCase().replace(/\s+/g, '-')}`}>View Project</Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default HeroSection;
