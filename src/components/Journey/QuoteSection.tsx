'use client';
import { motion } from 'framer-motion';
import { MdFormatQuote } from "react-icons/md";

export default function QuoteSection() {
  return (
    <motion.section
      className="relative mt-64 px-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Grote quote linksboven */}
      <motion.span
        className="absolute top-0 left-0 text-accent opacity-20"
        initial={{ x: -100, y: -100, opacity: 0, rotate: -20 }}
        whileInView={{ x: 0, y: 0, opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1 }}
      >
        <MdFormatQuote className="h-[20rem] w-[20rem] md:h-[28rem] md:w-[28rem] rotate-180 select-none" />
      </motion.span>

      {/* Quote tekst */}
      <blockquote className="relative z-10">
        <p className="text-xl md:text-7xl font-semibold text-text dark:text-text-dark leading-relaxed font-heading">
          <span className='font-heading'>Climb the mountain </span>, code the sky, <br />
          <span className='font-heading'>Errors fall,</span> but dreams don’t die, <br />
          <span className='font-heading'>Step by step,</span> I learn to fly.
        </p>
      </blockquote>

      {/* Grote quote rechtsonder */}
      <motion.span
        className="absolute bottom-0 right-0 text-accent opacity-20"
        initial={{ x: 100, y: 100, opacity: 0, rotate: 20 }}
        whileInView={{ x: 0, y: 0, opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <MdFormatQuote className="h-[20rem] w-[20rem] md:h-[28rem] md:w-[28rem] select-none" />
      </motion.span>

      {/* Auteur */}
      <motion.p
        className="mt-12 text-lg md:text-xl text-secondary  relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        — By ChatGPT
      </motion.p>
    </motion.section>
  );
}
