import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const heroBoxRef = useRef<HTMLDivElement | null>(null);
  const topRefs = useRef<HTMLHeadingElement[]>([]);
  const bottomRefs = useRef<(HTMLHeadingElement | HTMLParagraphElement)[]>([]);
  const buttonsRefs = useRef<HTMLButtonElement[]>([]);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tops = topRefs.current.filter(Boolean);
      const bottoms = bottomRefs.current.filter(Boolean);
      const btns = buttonsRefs.current.filter((el): el is HTMLButtonElement => !!el);

      if (heroBoxRef.current) {
        gsap.from(heroBoxRef.current, { opacity: 0, duration: 1, ease: "power2.out" });
      }

      if (tops.length) {
        gsap.from(tops, { y: -50, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out", delay: 0.5 });
      }

      if (bottoms.length) {
        gsap.from(bottoms, { y: 50, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out", delay: 1 });
      }

      if (btns.length) {
        gsap.fromTo(
          btns,
          { scale: 0, opacity: 0, pointerEvents: "none" },
          {
            scale: 1,
            opacity: 1,
            pointerEvents: "auto",
            zIndex: 9999,
            stagger: 0.15,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 1.5,
          }
        );
      }

    }, heroBoxRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-container">
      <img className="hero-background" src="/Landing/background.jpg" alt="Hero Background" />

      <div className="hero-box" ref={heroBoxRef}>
        <div className="hero-top">
          <h4 ref={(el) => { if(el) topRefs.current[0] = el; }} className="hero-name">PERSYN WANNES</h4>
          <h4 ref={(el) => { if(el) topRefs.current[1] = el; }} className="hero-tagline">Working in Belgium | Student</h4>
        </div>

        <div className="hero-bottom">
          <h1 ref={(el) => { if(el) bottomRefs.current[0] = el; }} className="hero-title">FULL STACK DEVELOPER</h1>
          <div className="hero-subtitle-cta">
            <p ref={(el) => { if(el) bottomRefs.current[1] = el; }} className="hero-subtitle">
              I enjoy building functional and interactive web applications. Currently exploring both front-end and back-end technologies.
            </p>
            <div className="hero-buttons">
              <button ref={(el) => { if(el) buttonsRefs.current[0] = el; }} onClick={() => router.push('/showcase')}>See My Work</button>
              <button ref={(el) => { if(el) buttonsRefs.current[1] = el; }} onClick={() => router.push('/showcase')}>Learn My Story</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
