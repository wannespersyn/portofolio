"use client";
import React, { useState } from "react";
import '../../css/playground/wrapped.css';

const wrappedData = [
  { year: 2022, img: "/playground/wrapped/2022.jpeg" },
  { year: 2023, img: "/playground/wrapped/2023.jpeg" },
  { year: 2024, img: "/playground/wrapped/2024.jpeg" },
  { year: 2025, img: "/playground/wrapped/2025.jpeg" },
];

export default function WrappedGrid() {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const handleClick = (year: number) => {
    setActiveYear(year === activeYear ? null : year); // toggle
  };

  return (
    <section className="bg-black text-white py-20 px-6 h-screen">
      <h2 className="text-4xl font-bold text-center mb-12">Spotify Wrapped</h2>

      {/* Card Grid */}
      <div className="flex justify-between gap-8 max-w-4xl mx-auto">
        {wrappedData.map((item) => {
          const isActive = activeYear === item.year;
          return (
            <div
              key={item.year}
              className="w-full h-72 perspective"
              onClick={() => handleClick(item.year)}
            >
              <div
                className={`relative w-full h-full duration-700 transform-style preserve-3d transition-transform ${
                  isActive ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 bg-white/5 rounded-xl flex items-center justify-center text-xl font-semibold backface-hidden">
                  {item.year}
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 rounded-xl overflow-hidden rotate-y-180 backface-hidden shadow-2xl">
                  <img
                    src={item.img}
                    alt={`Wrapped ${item.year}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
