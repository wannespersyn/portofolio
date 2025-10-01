'use client';

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WildWinesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.utils.toArray(".fade-item").forEach((el: any) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const milestones = [
    { title: 'First Version', desc: 'Learned HTML, CSS, SCSS, and JavaScript. Built a basic wine shop website.' },
    { title: 'Feature Expansion', desc: 'Added user authentication, product management, and backend using Node.js & PostgreSQL.' },
    { title: 'UX & Optimization', desc: 'Rebuilt frontend in React & Tailwind CSS for better performance and responsive UX.' }
  ];

  const screenshots = [
    { src: '/TheBeginning/dashboard.png', top: '10%', left: '60%', rotate: -12 },
    { src: '/TheBeginning/reservation.png', top: '40%', left: '20%', rotate: 8 },
    { src: '/TheBeginning/subscription.png', top: '70%', left: '50%', rotate: -6 }
  ];

  return (
    <section ref={sectionRef} className="relative mt-32 px-6 md:px-32 space-y-12">
      <h2 className="text-6xl md:text-9xl font-bold text-text dark:text-text-dark mb-20 font-heading uppercase leading-tight text-center fade-item">
        <span className="text-accent">The WildWines</span> Journey
      </h2>

      <p className="max-w-3xl mx-auto text-lg md:text-xl text-text dark:text-text-dark/90 mb-16 text-center fade-item">
        Over the years, developing the WildWines app has been a journey of growth...
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
        <div className="space-y-8">
          {milestones.map((item) => (
            <div key={item.title} className="p-6 bg-primary/20 dark:bg-primary-dark/30 rounded-2xl shadow-lg fade-item">
              <h3 className="text-2xl font-bold text-accent mb-2">{item.title}</h3>
              <p className="text-text dark:text-text-dark/90">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative w-full h-[500px] md:h-[600px]">
          {screenshots.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={`WildWines Screenshot ${img.src}`}
              className="absolute w-40 md:w-56 drop-shadow-2xl rounded-xl cursor-pointer fade-item"
              style={{ top: img.top, left: img.left, rotate: `${img.rotate}deg` }}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <p className="max-w-3xl mx-auto text-lg md:text-xl text-text dark:text-text-dark/90 text-center fade-item">
        Lessons learned: real-world problem solving, full-stack development practice, and creating scalable, user-focused applications.
      </p>
    </section>
  );
}
