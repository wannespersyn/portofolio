"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PROJECTS = [
  {
    title: "Project One",
    description: "Revolutionary design that pushes boundaries.",
    image: "https://source.unsplash.com/random/1600x900/?tech,code",
    link: "https://example.com/project-one",
  },
  {
    title: "Project Two",
    description: "Creative concepts crafted with precision.",
    image: "https://source.unsplash.com/random/1600x900/?design,abstract",
    link: "https://example.com/project-two",
  },
  {
    title: "Project Three",
    description: "Minimalistic but powerful digital experiences.",
    image: "https://source.unsplash.com/random/1600x900/?minimal,art",
    link: "https://example.com/project-three",
  },
];

const ProjectsSection: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sectionsRef.current.forEach((section, i) => {
      const titleSplit = new SplitText(section.querySelector(".project-title"), {
        type: "chars words",
      });
      const descSplit = new SplitText(section.querySelector(".project-desc"), {
        type: "words",
      });

      gsap.set([titleSplit.chars, descSplit.words], { yPercent: 100, opacity: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        scrub: true,
        onEnter: () => animateIn(titleSplit, descSplit),
        onEnterBack: () => animateIn(titleSplit, descSplit),
        onLeave: () => animateOut(titleSplit, descSplit),
        onLeaveBack: () => animateOut(titleSplit, descSplit),
      });
    });

    // progress indicator
    ScrollTrigger.create({
      trigger: ".projects-container",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (progressRef.current) {
          const dots = progressRef.current.querySelectorAll(".dot");
          const activeIndex = Math.round(self.progress * (PROJECTS.length - 1));
          dots.forEach((dot, i) =>
            dot.classList.toggle("active", i === activeIndex)
          );
        }
      },
    });
  }, []);

  const animateIn = (titleSplit: SplitText, descSplit: SplitText) => {
    gsap.to(titleSplit.chars, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    });
    gsap.to(descSplit.words, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  };

  const animateOut = (titleSplit: SplitText, descSplit: SplitText) => {
    gsap.to([titleSplit.chars, descSplit.words], {
      yPercent: -100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.8,
      ease: "power2.in",
    });
  };

  return (
    <div className="relative projects-container">
      {/* Progress dots */}
      <div
        ref={progressRef}
        className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50"
      >
        {PROJECTS.map((_, i) => (
          <div
            key={i}
            className="dot w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 transition-all duration-300"
          ></div>
        ))}
      </div>

      {/* Project sections */}
      {PROJECTS.map((project, i) => (
        <section
          key={i}
          ref={(el: HTMLDivElement | null) => { if(el) sectionsRef.current[i] = el; }}
          className="w-screen h-screen flex items-center justify-center relative overflow-hidden"
        >
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="relative z-10 text-center px-8">
            <h2 className="project-title font-heading text-6xl md:text-8xl font-bold text-white dark:text-gray-100 mb-6">
              {project.title}
            </h2>
            <p className="project-desc font-body text-xl md:text-2xl text-white/90 dark:text-gray-300 mb-8">
              {project.description}
            </p>
            <a
              href={project.link}
              target="_blank"
              className="inline-block px-6 py-3 bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white font-bold rounded-full hover:scale-105 transition"
            >
              View Project
            </a>
          </div>
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        </section>
      ))}
    </div>
  );
};

export default ProjectsSection;
