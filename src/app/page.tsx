"use client";

import HeroSection from "@/components/Landing/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-black via-gray-900 to-gray-800">
        <h1 className="text-3xl font-bold text-white md:text-6xl lg:text-6xl mb-">
          UNDER CONSTRUCTION
        </h1>
        <p className="mt-4 text-lg text-gray-300 md:text-xl lg:text-2xl max-w-2xl">
          This site is currently being updated. Please check back later for the
          new and improved version!
        </p>
      </section>
    </>
  );
}
