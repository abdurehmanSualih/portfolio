"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-br from-dark-bg via-primary-900/40 to-accent-600/20 bg-[length:200%_200%]"
      />
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(99,102,241,0.15),transparent)]"
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between">

          {/* ── Left: text content ── */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting badge */}
            <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300">
              <span className="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
              Available for work
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
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
              className="mb-10 max-w-xl text-base text-gray-400 sm:text-lg lg:mx-0 mx-auto"
            >
              Building scalable web apps with Next.js, Laravel &amp; Express.js and mobile apps with Flutter
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
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

          {/* ── Right: profile image ── */}
          <motion.div
            className="flex-shrink-0"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Glow ring behind image */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/40 to-accent-500/30 blur-2xl scale-110"
              />
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary-500/40 shadow-2xl shadow-primary-500/20 sm:h-80 sm:w-80">
                <Image
                  src="/profile.jpg"
                  alt="Abdurehman Sualih"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
