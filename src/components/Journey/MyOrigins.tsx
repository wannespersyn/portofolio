"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../../css/journey/myorigins.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  text: string;
  images: string[];
}

const timeline: TimelineItem[] = [
  {
    year: "2006",
    title: "Eerste Computer",
    text: "Mijn eerste aanraking met een toetsenbord. Vol nieuwsgierigheid en chaos, maar ook de eerste vonk van een passie voor technologie.",
    images: ["/journey/firstComputer.JPG"],
  },
  {
    year: "2014",
    title: "Lego Mindstorms",
    text: "Samen met mijn vader bouwde ik mijn eerste Mindstorms-robot. Voor het eerst zag ik dat je zelf dingen kon creëren die echt werken.",
    images: ["/journey/2010-mindstorms.jpeg"],
  },
  {
    year: "2017",
    title: "Eerste PC Build",
    text: "Het uit elkaar halen, opnieuw opbouwen, kapot maken en weer repareren van een computer. Die hele cyclus leerde me veel over hardware en doorzettingsvermogen.",
    images: ["/journey/2014-pcbuild.jpg"],
  },
  {
    year: "2019",
    title: "Industriële IT (Secundair onderwijs)",
    text: "In het vijfde middelbaar startte ik met Industriële IT. Hier leerde ik programmeren, elektriciteit en automatisatie. Als eindproject bouwde ik een klein domoticasysteem met een eigen interface.",
    images: ["/journey/2017-domotica.jpg"],
  },
  {
    year: "2021",
    title: "Toegepaste Informatica – HoGent",
    text: "Mijn eerste jaar hoger onderwijs in Toegepaste Informatica. Ik verdiepte me in softwareontwikkeling en design, en realiseerde mijn eerste serieuze projecten.",
    images: ["/journey/2021-highschool.jpg"],
  },
  {
    year: "2022",
    title: "Studie aan UCLL",
    text: "Door een curriculumwijziging verhuisde ik naar UCLL. Hier koos ik resoluut voor de afstudeerrichting Full Stack Development, de richting die me het meest intrigeert.",
    images: ["/journey/2022-ucll.jpg"],
  },
  {
    year: "2026",
    title: "Stage",
    text: "Een jaar waarin ik mijn kennis in de praktijk kan brengen en ervaring opdoe in echte projecten. Klaar om mijn vaardigheden toe te passen.",
    images: ["/journey/2026-internship.jpg"],
  },
  {
    year: "Toekomst",
    title: "Carrière",
    text: "Het verhaal gaat verder… bouwen, leren en innoveren blijven mijn drijfveren.",
    images: ["/journey/future.jpg"],
  },
];

export default function TimelineSection() {
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const yearElsRef = useRef<HTMLHeadingElement[]>([]);


  useLayoutEffect(() => {
    sectionsRef.current.forEach((section, i) => {

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center-=0",
        onEnter: () => {
          yearElsRef.current[i]?.classList.add("active");
          nodesRef.current[i]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        },
        onEnterBack: () => {
          yearElsRef.current[i]?.classList.add("active");
          nodesRef.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
        },

        onLeave: () => yearElsRef.current[i]?.classList.remove("active"),
        onLeaveBack: () => yearElsRef.current[i]?.classList.remove("active"),
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => nodesRef.current[i]?.classList.add("active"),
        onEnterBack: () => nodesRef.current[i]?.classList.add("active"),
        onLeave: () => nodesRef.current[i]?.classList.remove("active"),
        onLeaveBack: () => nodesRef.current[i]?.classList.remove("active"),
      });

    });
  }, []);


  return (
    <section className="flex w-full">
      {/* Sidebar Years */}
      <aside className="fixed top-0 left-0 h-full w-56 bg-black flex flex-col items-center justify-center z-30 border-r border-white/20">
        <div className="flex flex-col items-start gap-4 text-center">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              ref={(el) => {
                if (el) nodesRef.current[i] = el;
              }}
              className="timeline-year-wrapper"
            >
              <h3
                ref={(el) => { if(el) yearElsRef.current[i] = el }}
                className="timeline-year text-white/60 text-2xl md:text-3xl font-light cursor-pointer transition-colors duration-300"
              >
                {item.year}
              </h3>

            </div>
          ))}
        </div>
      </aside>

      {/* Content Sections */}
      <div className="content-sections">
        {timeline.map((item, i) => (
          <div
            key={item.year}
            ref={(el) => {
              if (el) sectionsRef.current[i] = el;
            }}
            className="relative min-h-screen flex flex-col justify-center"
          >
            <div className="overlay-content">
              <div className="">
                <h2 className="item-title">{item.title}</h2>
                <p className="item-text">{item.text}</p>
              </div>
            </div>

            <div className="relative z-10 text-white ml-64">
              <h1 className="year-title opacity-20">THE {item.year == "Toekomst" ? "FUTURE" : "YEAR"}</h1>
              <h1 className={`year-title ${item.year == "Toekomst" ? "opacity-0" : ""}`}>{item.year}</h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
