"use client";

import "../css/header.css";
import { gsap } from "@/app/animations/gsapSetup";
import { useEffect, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [currentImage, setCurrentImage] = useState(0);
  const menuImages = [
    "/navigation/2006_img_1.JPG", 
    "/navigation/2007_img_1.jpg", 
    "/navigation/2025_1_img.JPG",
    "/navigation/2025_2_img.JPG"
  ];

  // Body scroll lock when menu is open
  useEffect(() => {
    const icon = document.querySelector(".nav-toggle svg");
    if (!icon) return;
    gsap.fromTo(icon, { rotate: isMenuOpen ? -90 : 90, opacity: 0 }, { rotate: 0, opacity: 1, duration: 0.4 });
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);



  useEffect(() => {

    // Sluit menu bij klikken op big links of top nav links
    const allLinks = document.querySelectorAll<HTMLAnchorElement>(".menu-link .link, .menu-top-nav .link");
    allLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (isMenuOpen) toggleMenu();
      });
    });



    // ================ Elementen selecteren ================
    const navToggle = document.querySelector<HTMLDivElement>(".nav-toggle");
    const menuOverlay = document.querySelector<HTMLDivElement>(".menu-overlay");
    const menuContent = document.querySelector<HTMLDivElement>(".menu-content");
    const menuImage = document.querySelector<HTMLDivElement>(".menu-img");
    const menuLinksWrapper = document.querySelector<HTMLDivElement>(".menu-links-wrapper");
    const linkHighlighter = document.querySelector<HTMLDivElement>(".link-highlighter");
    const menuTopNav = document.querySelector<HTMLDivElement>(".menu-top-nav");

    // ================ Check of alle elementen bestaan ================
    if (!navToggle || !menuOverlay || !menuContent || !menuImage || !menuLinksWrapper || !linkHighlighter || !menuTopNav) {
      console.error("One or more required elements are missing.");
      return;
    }

    // ================ Variabelen ================
    let currentX = 0;
    let targetX = 0;
    const lerpFactor = 0.02;

    let currentHighlighterX = 0;
    let targetHighlighterX = 0;
    let currentHighlighterWidth = 0;
    let targetHighlighterWidth = 0;

    let isMenuOpen = false;
    let isMenuAnimating = false;

    // ================ Initialisaties ================
    const menuLinks = document.querySelectorAll<HTMLAnchorElement>(".menu-link .link");

    gsap.set(menuOverlay, { opacity: 0 });
    gsap.set(menuContent, { y: "50%", opacity: 0 });
    gsap.set(menuImage, { scale: 0.5, opacity: 0 });
    gsap.set(menuLinks, { y: "150%" });
    gsap.set(linkHighlighter, { y: "150%" });
    gsap.set(menuTopNav, { y: "-50%", opacity: 1 });

    // Default highlighter position
    const defaultLinkText = document.querySelector<HTMLSpanElement>(".menu-link:first-child .link span");
    if (defaultLinkText) {
      const linkWidth = defaultLinkText.offsetWidth;
      linkHighlighter.style.width = linkWidth + "px";
      currentHighlighterWidth = linkWidth;
      targetHighlighterWidth = linkWidth;

      const defaultLinkTextElement = document.querySelector<HTMLDivElement>(".menu-link:first-child");
      if (defaultLinkTextElement) {
        const linkRect = defaultLinkTextElement.getBoundingClientRect();
        const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();
        const initialX = linkRect.left - menuWrapperRect.left;
        currentHighlighterX = initialX;
        targetHighlighterX = initialX;
      }
    }

    function toggleMenu() {
      if (isMenuAnimating) return;
      isMenuAnimating = true;
      setIsMenuOpen(!isMenuOpen);

      // =============== Open Menu ================
      if (!isMenuOpen) {
        gsap.set(menuOverlay, { opacity: 1 });
        gsap.to(menuOverlay, {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "expo.out",
          onComplete: () => {
            gsap.set(".menu-link", { overflow: "visible" });
            isMenuAnimating = false;
            isMenuOpen = true;
          },
        });
 
        gsap.fromTo(menuLinks, 
          { y: "100%", opacity: 0 }, 
          { y: "0%", opacity: 1, duration: 1, stagger: 0.05, ease: "power3.out" }
        );

        gsap.from(".menu-link .link span", { y: 50, opacity: 0, stagger: 0.1, ease: "back.out(1.7)" });

        gsap.fromTo(".menu-top-nav .top-links .link", 
          { y: -20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power3.out" }
        );


        gsap.to(menuContent, { y: "0%", opacity: 1, duration: 1.5, ease: "expo.out" });
        gsap.to(menuImage, { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" });
        gsap.to(menuLinks, { y: "0%", duration: 1.25, stagger: 0.1, delay: 0.25, ease: "expo.out" });
        gsap.to(linkHighlighter, { y: "0%", duration: 1, delay: 1, ease: "expo.out" });
        gsap.to(menuTopNav, { y: "0%", opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 });
      } 
      // =============== Close Menu ================
      else {  
        gsap.to(menuLinks, { y: "-200%", duration: 1.25, ease: "expo.out" });
        gsap.to(menuTopNav, { y: "-50%", opacity: 0, duration: 0.75, ease: "power3.in" });

        gsap.to(menuOverlay, {
          clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "expo.out",
          onComplete: () => {
            gsap.set(menuOverlay, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" });
            gsap.set(menuLinks, { y: "150%" });
            gsap.set(linkHighlighter, { y: "150%" });
            gsap.set(menuContent, { y: "50%", opacity: 0.25 });
            gsap.set(menuImage, { scale: 0.5, opacity: 0.25 });
            gsap.set(".menu-link", { overflow: "hidden" });

            gsap.set(menuLinksWrapper, { x: 0 });
            currentX = 0;
            targetX = 0;

            isMenuAnimating = false;
            isMenuOpen = false;
          },
        });
      }
    }

    navToggle.addEventListener("click", toggleMenu);

    const menuLinksContainers = document.querySelectorAll<HTMLDivElement>(".menu-link");
    menuLinksContainers.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        if (window.innerWidth < 1000) return;
        if (!isMenuOpen) return;

        const linkCopy = link.querySelectorAll(".link span");
        const visibleCopy = linkCopy[0];
        const animatedCopy = linkCopy[1];

        const visibleChars = visibleCopy.querySelectorAll<HTMLElement>(".char");
        gsap.to(visibleChars, { y: "-110%", duration: 0.5, ease: "expo.inOut" });

        const animatedChars = animatedCopy.querySelectorAll<HTMLElement>(".char");
        gsap.to(animatedChars, { y: "0%", duration: 0.5, ease: "expo.inOut", stagger: 0.03 });
      });

      link.addEventListener("mouseleave", () => {
        if (window.innerWidth < 1000) return;
        if (!isMenuOpen) return;

        const linkCopy = link.querySelectorAll(".link span");
        const visibleCopy = linkCopy[0];
        const animatedCopy = linkCopy[1];

        const animatedChars = animatedCopy.querySelectorAll<HTMLElement>(".char");
        gsap.to(animatedChars, { y: "110%", duration: 0.5, ease: "expo.inOut", stagger: 0.03 });

        const visibleChars = visibleCopy.querySelectorAll<HTMLElement>(".char");
        gsap.to(visibleChars, { y: "0%", duration: 0.5, ease: "expo.inOut", stagger: 0.03 });
      });
    });

    menuOverlay.addEventListener("mousemove", (e: MouseEvent) => {
      if (window.innerWidth < 1000) return;
      if (!isMenuOpen) return;

      const mouseX = e.clientX;
      const viewportWidth = window.innerWidth;
      const menuLinksWrapperRect = menuLinksWrapper.offsetWidth;

      const maxMoveLeft = 0;
      const maxMoveRight = viewportWidth + menuLinksWrapperRect;

      const sensitivityRange = viewportWidth * 0.5;
      const startX = (viewportWidth - sensitivityRange) / 2;
      const endX = (viewportWidth + sensitivityRange) / 2;

      let mousePercentage: number;
      if (mouseX < startX) {
        mousePercentage = 0;
      } else if (mouseX > endX) {
        mousePercentage = 1;
      } else {
        mousePercentage = (mouseX - startX) / sensitivityRange;
      }

      targetX = maxMoveLeft + mousePercentage * (maxMoveRight - maxMoveLeft);
    });

    menuLinksContainers.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        if (window.innerWidth < 1000) return;

        const linkRect = link.getBoundingClientRect();
        const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();

        targetHighlighterX = linkRect.left - menuWrapperRect.left;

        const linkCopyElement = link.querySelector(".link span");
        targetHighlighterWidth = linkCopyElement ? (linkCopyElement as HTMLElement).offsetWidth : link.offsetWidth;
      });
    });

    menuLinksWrapper.addEventListener("mouseleave", () => {
      if (isMenuOpen === false) return;
      const defaultLinkText = document.querySelector<HTMLDivElement>(".menu-link:first-child");
      const defaultLinkTextSpan = defaultLinkText?.querySelector<HTMLSpanElement>(".link span");
      if (!defaultLinkText || !defaultLinkTextSpan) return;

      const linkRect = defaultLinkText.getBoundingClientRect();
      const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();

      targetHighlighterX = linkRect.left - menuWrapperRect.left;
      targetHighlighterWidth = defaultLinkTextSpan.offsetWidth;
    });

    function animate() {    
      
      currentX += (targetX - currentX) * lerpFactor;
      currentHighlighterX += (targetHighlighterX - currentHighlighterX) * lerpFactor;
      currentHighlighterWidth += (targetHighlighterWidth - currentHighlighterWidth) * lerpFactor;

      gsap.set(menuLinksWrapper, { x: -currentX });
      gsap.set(linkHighlighter, { x: currentHighlighterX, width: currentHighlighterWidth });

      requestAnimationFrame(animate);
    }

    
    animate();

    // Afbeeldingen wisselen elke 3 seconden
    const imageInterval = setInterval(() => {
      gsap.to(menuImage.querySelector("img"), {
        opacity: 0, duration: 0.6, onComplete: () => {
          setCurrentImage(prev => (prev + 1) % menuImages.length);
          gsap.fromTo(menuImage.querySelector("img"), { opacity: 0 }, { opacity: 1, duration: 0.6 });
        }
      });
    }, 3000);


    return () => {
      navToggle.removeEventListener("click", toggleMenu);
      clearInterval(imageInterval);
    };

  }, []);

  return (
    <>
      {/* Navigation */}
      <nav>
        <div className="nav-toggle flex items-center gap-2" 
        >
          {isMenuOpen ? ( <> <FiX size={28} /> Close </> ) : ( <> <FiMenu size={28} /> Menu </> )}  
        </div>
        <div className="nav-item"></div>
      </nav>
      
      <div className="menu-overlay">        

        {/* Menu Content Left and Right of Image */}
        <div className="menu-content">
          <div className="menu-col">
            <p>Persyn Wannes</p>
            <p>Rotselaar</p>
            <p>Belgium</p>
            <br />
            <p>Student</p>
            <p>Full Stack Developer</p>
            <br />
            <p>Email</p>
            <p>wannes.persyn@gmail.com</p>
            <br />
            <p>Phone</p>
            <p>+32 478 08 80 82</p>
          </div>
          <div className="menu-col">
            <p><Link className="link" href="https://www.facebook.com/wannes.persyn.1">Facebook</Link></p>
            <p><Link className="link" href="https://www.linkedin.com/in/wannes-persyn/">LinkedIn</Link></p>
            <p><Link className="link" href="https://github.com/wannespersyn">GitHub</Link></p>
            <br />
            <br />
            <p>Language</p>
            <p>English</p>
            <br />
            <br />
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>

        {/* ============ IMAGE ============ */}
        <div className="menu-img">
          <img className="header-img" src={menuImages[currentImage]} alt="Menu visual" />
        </div>


        {/* ============ BIG LINKS ============ */}
        <div className="menu-links-wrapper">
          <div className="menu-link">
            <Link className="link" href="/">
              <span>Home | </span>
              <span>Home |</span>
            </Link>
          </div>
          <div className="menu-link">
            <Link className="link" href="/journey">
              <span>Journey | </span>
              <span>Journey | </span>
            </Link>
          </div>

          <div className="menu-link">
            <Link className="link" href="/showcase">
              <span>Showcase | </span>
              <span>Showcase | </span>
            </Link>
          </div>

          <div className="menu-link">
            <Link className="link" href="/playground">
              <span>Playground | </span>
              <span>Playground | </span>
            </Link>
          </div>

          <div className="menu-link">
            <Link className="link" href="/contact">
              <span>Contact</span>
              <span>Contact</span>
            </Link>
          </div>

        {/* ============ LINK HIGHLIGHTER ============ */}
        <div className="link-highlighter"></div>
        </div>

        {/* ============ TOP NAVIGATION ============ */}
        <div className="menu-top-nav">
          <div className="top-links">
            {["Home", "Journey", "Showcase", "Playground", "Contact"].map((text) => {
              const href = `/${text === "Home" ? "" : text.toLowerCase()}`;
              const isActive = pathname.toLowerCase() === href;

              return (
                <Link
                  key={text}
                  href={href}
                  className={`menu-link-top link ${isActive ? "menu-active" : ""}`}
                >
                  {text.toUpperCase()}
                </Link>
              );
            })}
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </>
  )
}
