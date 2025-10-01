"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import '../../css/journey/steps.css';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const TimelineWithSteps: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);

  // Array met alle card-afbeeldingen
  const cardImages: string[] = [
    "/TheBeginning/firstComputer.JPG",
    "/TheBeginning/heroSection.png",
    "/potential/Slovenie_bovenopberg.jpg",
    "/potential/Slovenie_Koeien.JPG",
  ];

  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current || !cardsContainerRef.current) return;

    // ScrollSmoother instellen
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });

    // Selecteer alle card elementen
    const cards = gsap.utils.toArray(".card") as HTMLElement[];
    const cardsContainer = cardsContainerRef.current;

    gsap.set(cards[0], { opacity: 1 });

    const totalScroll = cardsContainer.scrollWidth - window.innerWidth + 50;

    // Horizontale scroll animatie
    const scrollTrack = gsap.to(cardsContainer, {
      x: -totalScroll,
      ease: "none",
      duration: cards.length,
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: true,
        pin: true,
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
          containerAnimation: scrollTrack,
        },
      });
    });

    // Timeline progress bar
    if (timelineProgressRef.current) {
      gsap.to(timelineProgressRef.current, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-section",
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
          containerAnimation: scrollTrack,
        },
      });
    }

    // Step indicators boven timeline
    const steps = document.querySelectorAll<HTMLDivElement>(".timeline-step");
    steps.forEach((step, i) => {
      gsap.to(step, {
        backgroundColor: "var(--color-accent)",
        scrollTrigger: {
          trigger: cards[i],
          start: "left 50%",
          end: "left 40%",
          scrub: true,
          containerAnimation: scrollTrack,
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

              {cardImages.map((src: string, index: number) => (
                <div className="card" key={index}>
                  <img src={src} alt={`Card ${index + 1}`} />
                </div>
              ))}
            </div>

            {/* Timeline met steps */}
            <div
              className="timeline"
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50px",
                right: "50px",
                height: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {cardImages.map((_: string, index: number) => (
                <div
                  key={index}
                  className="timeline-step"
                  style={{
                    flex: 1,
                    height: "12px",
                    borderRadius: "6px",
                    backgroundColor: "var(--color-secondary)",
                  }}
                />
              ))}

              <div
                className="timeline-progress"
                ref={timelineProgressRef}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "0%",
                  backgroundColor: "var(--color-accent-2)",
                  borderRadius: "6px",
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineWithSteps;
