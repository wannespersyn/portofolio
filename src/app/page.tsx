"use client";

import HeroSection from "@/components/Landing/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-black via-gray-900 to-gray-800">
        <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
          Welcome to My Portfolio
        </h1>
        <p className="mt-4 text-lg text-gray-300 md:text-xl lg:text-2xl max-w-2xl">
          I'm a passionate developer specializing in creating beautiful and functional web applications. Explore my projects and get in touch!
        </p>
      </section>
    </>
  );
}
