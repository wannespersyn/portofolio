"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import '../../css/journey/steps.css';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const TimelineWithProgress: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current || !cardsContainerRef.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });

    const cards = gsap.utils.toArray(".card") as HTMLElement[];
    const cardsContainer = cardsContainerRef.current;

    gsap.set(cards[0], { opacity: 1 });

    const totalScroll = cardsContainer.scrollWidth - window.innerWidth + 50;

    // Horizontale scroll + timeline progress
    const scrollTrack = gsap.to(cardsContainer, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          if (timelineProgressRef.current) {
            timelineProgressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    // Cards fade-in animatie
    cards.forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        scrollTrigger: {
          trigger: card,
          start: "left 95%",
          end: "left 90%",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      smoother?.kill();
    };
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh" }}>
      <div id="wrapper" ref={wrapperRef}>
        <div id="content" ref={contentRef}>
          <div className="scroll-section">
            <div className="cards-container" ref={cardsContainerRef}>
              <div className="heading">
                <h1>Stap 1: De Begin</h1>
              </div>

              <div className="card">
                <img src="/TheBeginning/firstComputer.JPG" alt="" />
              </div>
              <div className="card">
                <img src="/TheBeginning/heroSection.png" alt="" />
              </div>
              <div className="card">
                <img src="/potential/Slovenie_bovenopberg.jpg" alt="" />
              </div>
              <div className="card">
                <img src="/potential/Slovenie_Koeien.JPG" alt="" />
              </div>
            </div>

            {/* Timeline */}
            <div className="timeline">
              <div className="timeline-track">
                <div
                  className="timeline-progress"
                  ref={timelineProgressRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineWithProgress;
