"use client";
import TerminalCard from "@/components/projects/TerminalCard";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ProjectInfoProps {
  project: string;
  techSlides: Array<{
    title: string;
    description: string;
    items: string[];
    image: string;
  }>;
  challenges: Array<{
    title: string;
    challenge: string;
    solution: string;
  }>;
}


const techSlides = [
  {
    title: "Front-end",
    description:
      "Ik heb gekozen voor deze technologieën omdat ik componenten veel opnieuw moet gebruiken voor elk product zodat ik dynamisch kan programmeren. Tailwind zorgt ervoor dat ik makkelijk inline kan stylen en Motion animaties zorgen voor een vloeiende ervaring.",
    items: ["React", "Next.js", "Tailwind CSS", "Motion Animations"],
    image: "/projects/react-icon.svg",
  },
  {
    title: "Back-end",
    description:
      "Node.js en Express gekozen voor flexibiliteit en herbruikbare componenten in de serverlogica. Hierdoor kan ik makkelijk API's opzetten en de backend schaalbaar houden.",
    items: ["Node.js", "Express"],
    image: "/projects/expressAndnode.png",
  },
  {
    title: "Database",
    description:
      "MySQL gekozen als relationele database en Azure Blob Storage voor media. Zo kan ik data en bestanden gestructureerd beheren.",
    items: ["MySQL", "Azure Blob Storage"],
    image: "/projects/mysql.png",
  },
  {
    title: "Authentication",
    description:
      "JWT en Cookies gekozen om gebruikerssessies veilig te beheren. Zo blijft de applicatie beveiligd en soepel in gebruik.",
    items: ["JWT & Cookies"],
    image: "/projects/cookies.jpg",
  },
];

const challenges = [
  {
    title: "Integratie met KMO SHOPS",
    challenge:
      "Het integreren van de KMO SHOPS API was een uitdaging vanwege beperkte documentatie. Ik heb contact opgenomen met hun supportteam en gebruik gemaakt van Postman om de API-endpoints te testen en te begrijpen hoe ik bestellingen en producten kan synchroniseren.",
    solution: "TBA",
  },
  {
    title: "Image uploads & optimalisatie",
    challenge:
      "Het implementeren van een efficiënte image upload en optimalisatie systeem was cruciaal voor de prestaties van de website. Ik heb Azure Blob Storage gebruikt voor het opslaan van afbeeldingen en een image processing library om afbeeldingen te comprimeren en verschillende resoluties te genereren.",
    solution: "TBA",
  },
  {
    title: "Full-stack architectuur van scratch opgebouwd",
    challenge:
      "Het opzetten van een volledige full-stack architectuur vanaf nul was een leerzame ervaring. Ik heb de front-end en back-end gescheiden gehouden, RESTful API's ontworpen en gezorgd voor een soepele communicatie tussen de twee lagen.",
    solution: "TBA",
  },
];

const WildWines = () => {
  const overviewRef = useRef<HTMLDivElement>(null);
  const reflectRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth; // breedte van de slider
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const positions = [
    { top: "25%", left: "15%" },
    { top: "40%", left: "60%" },
    { top: "70%", left: "25%" },
  ];

  useEffect(() => {
    const reveal = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    reveal.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);



  return (
    <main className="flex flex-col w-full font-sans">

      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-20 text-center">
        <h1 className="hero-zoom reveal text-[8rem] font-special uppercase leading-[1] mb-1">Wild Wines</h1>
        <h2 className="text-4xl font-light mb-6">Full-Stack E-commerce Experience</h2>
        <ul className="flex mt-24 uppercase space-x-6 text-sm font-medium">
          <li>
            <button onClick={() => scrollToSection(overviewRef)}>Project Overview</button>
          </li>
          <li>
            <button onClick={() => scrollToSection(techRef)}>Technologies Used</button>
          </li>
          <li>
            <button onClick={() => scrollToSection(challengesRef)}>Challenges & Solutions</button>
          </li>
          <li>
            <button onClick={() => scrollToSection(reflectRef)}>Reflections & Learnings</button>
          </li>
        </ul>
      </section>

      {/* Overview Section */}
      <section ref={overviewRef} className="reveal fade-slide-up grid grid-cols-2 mx-8 gap-12 my-24">
        <div>
          <h2 className="text-6xl font-mono border-b text-right py-6">Project Overview</h2>
          <h3 className="text-4xl font-mono border-b text-right py-4">E-commerce website</h3>

          <div className="mt-24">
            <div className="flex justify-between border-b py-2 text-lg">
              <p className="italic">Company:</p>
              <p>ConnectNow</p>
            </div>
            <div className="flex justify-between border-b py-2 text-lg">
              <p className="italic">Duration:</p>
              <p>TBA</p>
            </div>
            <div className="flex justify-between border-b py-2 text-lg">
              <p className="italic">Role:</p>
              <p>Designer/Programmer</p>
            </div>
            <div className="flex justify-between border-b py-2 text-lg">
              <p className="italic">Link:</p>
              <p>https://www.wildwines.be/</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-15" >
          <h2 className="text-2xl font-mono py-6 underline">Description</h2>
          <div className="flex gap-12 text-lg leading-relaxed">
            <img src="/projects/wildwines.jpg" alt="" />
            <p>
              In 2021 ConnectNow asked me to build an e-commerce platform for their wine business, Wild Wines. The goal was to create a user-friendly website that allows customers to browse and purchase wines online, while also providing an intuitive admin panel for managing products.
            </p>
          </div>
        </div>
        
      </section>

      <section ref={techRef} className="px-20 py-24">
        <h2 className="text-6xl font-mono text-center mb-16">Technologies & Insights</h2>

        {/* Slider container */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex space-x-12 overflow-x-hidden scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {techSlides.map((slide) => (
              <div
                key={slide.title}
                className="snap-start flex-shrink-0 w-full md:w-3/4 lg:w-1/2 flex flex-col md:flex-row items-center gap-8 bg-secondary dark:bg-secondary-dark p-8 rounded-2xl shadow-lg"
              >
                <div className="md:w-2/3">
                  <h3 className="text-5xl font-semibold mb-4">{slide.title}</h3>
                  <p className="text-lg leading-relaxed mb-4">{slide.description}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {slide.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-secondary dark:bg-secondary-dark p-3 rounded-full shadow-lg hover:bg-accent"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-secondary dark:bg-secondary-dark p-3 rounded-full shadow-lg hover:bg-accent"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>


      <section ref={challengesRef} className="relative h-screen w-full px-10 py-24 overflow-hidden">
        <h2 className="text-6xl font-mono text-center mb-16 relative z-10">
          Challenges & Solutions
        </h2>

        {challenges.map((c, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={idx}
              className={`
                absolute rounded-xl bg-secondary dark:bg-secondary-dark shadow-2xl cursor-pointer transition-all duration-700 
                ${isActive ? "p-6" : ""}
              `}
              style={{
                top: isActive ? "50%" : positions[idx].top,
                left: isActive ? "50%" : positions[idx].left,
                width: isActive ? "55%" : "160px",
                height: isActive ? "60%" : "160px",
                transform: isActive
                  ? "translate(-50%, -50%) scale(1)"
                  : `translate(0, 0) rotate(${Math.random() * 20 - 10}deg)`,
                zIndex: isActive ? 50 : 5,
              }}
              onClick={() => {
                if (!isActive) setActiveIndex(idx); // open
              }}
            >
              {isActive ? (
                <div className="flex flex-col h-full relative overflow-y-auto">
                  <button
                    onClick={() => setActiveIndex(null)}
                    className="absolute top-4 right-4 text-3xl font-bold z-50"
                  >
                    ✕
                  </button>
                  <h3 className="text-3xl font-bold mb-4 pr-10">{c.title}</h3>
                  <p className="mb-4">
                    <strong>Challenge:</strong> {c.challenge}
                  </p>
                  <p>
                    <strong>Solution:</strong> {c.solution}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center p-4">
                  <h3 className="text-lg font-bold">{c.title}</h3>
                </div>
              )}
            </div>
          );
        })}
      </section>


      <section
        ref={reflectRef}
        className="relative min-h-screen w-full px-20 py-16 text-green-400 font-mono"
      >
        <h2 className="text-6xl font-mono text-center mb-20 text-white">
          Reflection & Learnings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "System Architecture",
              lines: [
                "booting reflection logs...",
                "designed complete front → back dataflow",
                "improved API structure & authentication flow",
                "learned to isolate logic for scalability",
              ],
            },
            {
              title: "Development Mindset",
              lines: [
                "initializing dev insights...",
                "balanced design with performance",
                "learned when to abstract & when to keep simple",
                "cleaner modular thinking",
              ],
            },
            {
              title: "Professional Growth",
              lines: [
                "loading personal growth...",
                "boosted communication with client & API providers",
                "handled unexpected issues calmly",
                "more confident full-stack approach",
              ],
            },
          ].map((terminal, idx) => (
            <TerminalCard key={idx} data={terminal} />
          ))}
        </div>
      </section>


    </main>
  );
};

export default WildWines;
