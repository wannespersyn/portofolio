"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/app/animations/gsapSetup";
import '../../css/journey/hero.css';
interface SplitConfig {
  key: string;
  selector: string;
  type: "chars" | "lines";
}

interface SplitMap {
  [key: string]: SplitText;
}

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [splits, setSplits] = useState<Record<string, any>>({});

  /**
   * ============== GSAP Scroll Animation ==============
   *
   * 1. We gebruiken useLayoutEffect i.p.v. useEffect om te zorgen dat de
   *    animatie pas draait nadat de DOM volledig klaarstaat (belangrijk voor GSAP).
   *
   * 2. gsap.context(...) zorgt ervoor dat alle selectors en animaties
   *    gescope’t worden tot dit component. Bij unmount wordt alles automatisch
   *    opgeruimd met ctx.revert().
   *
   * 3. We maken een timeline met ScrollTrigger:
   *    - trigger: heroRef.current → de hele Hero wrapper triggert de animatie.
   *    - start: "top top" → zodra de top van Hero het top van de viewport raakt.
   *    - end: "+=800" → de animatie duurt 800px scroll.
   *    - scrub: 0.6 → koppelt animatie aan scrollpositie met lichte smoothing.
   *    - pin: true → Hero blijft "gefixed" tijdens deze scroll-animatie.
   *
   * 4. Animatie-sequentie:
   *    - Eerst verdwijnt de hero-content (fade + klein beetje omhoog).
   *    - Tegelijk verdwijnt de hero-afbeelding (fade).
   *    - Daarna verschijnt de ABOUT-tekst:
   *      * opacity van 0 → 1
   *      * scale van 5 → 1 (komt groot in beeld en krimpt naar normaal formaat).
   *      * easing met power3.out voor een smooth effect.
   *
   * 5. Cleanup: ctx.revert() reset alles als het component unmount.
   */
  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=800",
          scrub: 0.6,
          pin: true,
        },
      });

      // Hero-content verdwijnt
      tl.to(".hero-content", { opacity: 0, y: -30, duration: 0.6 }, 0)
        // Hero-afbeelding verdwijnt tegelijk
        .to(imgRef.current, { opacity: 0, duration: 0.6 }, 0)
        // ABOUT komt in beeld en krimpt naar normale schaal
        .to(
          ".about",
          {
            opacity: 1,
            scale: 1,
            ease: "power3.out",
          },
          ">-0.2" // start nét nadat hero-content verdwijnt
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);
  
  /**
   * Maakt een map met gesplitste tekst-elementen
   * - key = naam die je kiest
   * - value = GSAP SplitText object
   */
  const createSplitTexts = (elements: SplitConfig[]): SplitMap => {
    const splitMap: SplitMap = {};

    elements.forEach(({ key, selector, type }) => {
      const config: any = { type, mask: type };
      if (type === "chars") config.charsClass = "chars";
      if (type === "lines") config.lineClass = "line";

      splitMap[key] = new SplitText(selector, config);
    });

    return splitMap;
  };

  /**
   * Animate progressbar in random stappen
   */
  const animateProgress = (duration = 4) => {
    const tl = gsap.timeline();
    const counterSteps = 5;
    let currentProgress = 0;

    for (let i = 0; i <= counterSteps; i++) {
      const finalStep = i === counterSteps - 1;
      const targetProgress = finalStep
        ? 1
        : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);

      currentProgress = targetProgress;

      tl.to(".preloader-progress-bar", {
        scaleX: targetProgress,
        duration: duration / counterSteps,
        ease: "power2.out",
      });
    }

    return tl;
  };

  useLayoutEffect(() => {
    document.fonts.ready.then(() => {
      // === 1. Tekst splitsen ===
      const splitElements: SplitConfig[] = [
        { key: "logoChars", selector: ".preloader-logo h1", type: "chars" },
        { key: "footerLines", selector: ".preloader-footer p", type: "lines" },
        { key: "headerChars", selector: ".header h1", type: "chars" },
        { key: "heroFooterP", selector: ".hero-footer p", type: "lines" },
      ];

      const newSplits = createSplitTexts(splitElements);
      setSplits(newSplits);

      // === 2. Initial states ===
      gsap.set(newSplits.logoChars.chars, { x: "100%" });
      gsap.set(
        [
          newSplits.footerLines.lines,
          newSplits.headerChars.chars,
          newSplits.heroFooterP.lines,
        ],
        { y: "100%" }
      );

      // === 3. Timeline Preloader ===
      const tl = gsap.timeline();

      // --- Fase 1: Logo letters schuiven in ---
      tl.to(newSplits.logoChars.chars, {
        x: "0%",
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      })

        // --- Fase 2: Footer text komt omhoog ---
        .to(
          newSplits.footerLines.lines,
          {
            y: "0%",
            stagger: 0.1,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.25"
        )

        // --- Fase 3: Progressbar animatie ---
        .add(animateProgress(2), "<")
        .set(".preloader-progress", { backgroundColor: "var(--color-secondary)" })

        // --- Fase 4: Logo en footer verdwijnen ---
        .to(
          newSplits.logoChars.chars,
          {
            x: "-100%",
            stagger: 0.05,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.5"
        )
        .to(
          newSplits.footerLines.lines,
          {
            y: "-100%",
            stagger: 0.1,
            duration: 1,
            ease: "power4.inOut",
          },
          "<"
        )

        // --- Fase 5: Progressbar fade out ---
        .to(
          ".preloader-progress",
          {
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25"
        )

        // --- Fase 6: Mask explosie + hero komt in beeld ---
        .to(
          ".preloader-mask",
          {
            scale: 5,
            duration: 2.5,
            ease: "power3.out",
          },
          "<"
        )
        .to(
          ".hero-img",
          {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "<"
        )

        // --- Fase 7: Hero header verschijnt ---
        .to(newSplits.headerChars.chars, {
          y: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          delay: -2,
        })

        // --- Fase 8: Hero footer tekst verschijnt ---
        .to(
          newSplits.heroFooterP.lines,
          {
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power4.out",
          },
          "-=1.5"
        );
    });
  }, []);


  return (
    <>
      {/* Preloader boven alles */}
      <section className="preloader-progress">
        <div className="preloader-progress-bar"></div>
        <div className="preloader-logo">
          <h1>My Journey</h1>
        </div>
      </section>
      <section className="preloader-mask"></section>
      <section className="preloader-content">
        <div className="preloader-footer">
          <p>
            Only those who are truly interested in learning about me should
            proceed.
          </p>
        </div>
      </section>

      <div ref={heroRef} className="hero-wrapper">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-img">
            <img ref={imgRef} className="img" src="/TheBeginning/heroSection.png" alt="" />
          </div>

          <div className="hero-content">
            <div className="header">
              <h1>
                Behind <br />
                The <br />
                Code
              </h1>
            </div>
            <div className="hero-footer">
              <p>Thought this would be a two-line bio? Think again...</p>
            </div>
          </div>
        </div>
      </section>

      <div className="about">
        <h2>ABOUT</h2>
      </div>
    </div>
    </>
  );
};

export default HeroSection;
