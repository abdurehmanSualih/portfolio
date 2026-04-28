"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-br from-dark-bg via-primary-900/40 to-accent-600/20 bg-[length:200%_200%]"
      />
      {/* Radial glow overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(99,102,241,0.15),transparent)]"
      />

      <motion.div
        className="mx-auto max-w-4xl px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Abdurehman Sualih
          </span>
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="mb-4 text-xl font-semibold text-primary-300 sm:text-2xl"
        >
          Full Stack &amp; Mobile App Developer
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mb-10 text-base text-gray-400 sm:text-lg"
        >
          Building scalable web apps with Next.js &amp; Laravel and mobile apps with Flutter
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="rounded-full bg-primary-500 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-primary-600 hover:shadow-primary-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-primary-500 px-8 py-3 font-semibold text-primary-300 transition-all hover:bg-primary-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            Hire Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
