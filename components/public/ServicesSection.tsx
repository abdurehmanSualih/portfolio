"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { SiNextdotjs, SiNodedotjs, SiFlutter } from "react-icons/si";
import { FaCode, FaServer, FaMobileAlt } from "react-icons/fa";

const services = [
  {
    icon: FaCode,
    accentIcon: SiNextdotjs,
    title: "Web Development",
    description:
      "Building modern, performant web applications with Next.js and the MERN stack. From landing pages to complex SPAs with clean, maintainable code.",
    tags: ["Next.js", "React", "MERN"],
    gradient: "from-primary-500/20 to-primary-900/10",
    border: "border-primary-500/30",
    iconColor: "text-primary-400",
  },
  {
    icon: FaServer,
    accentIcon: SiNodedotjs,
    title: "Backend & API Development",
    description:
      "Designing and building robust RESTful APIs and server-side systems with Node.js and Laravel. Scalable architecture with clean separation of concerns.",
    tags: ["Node.js", "Laravel", "REST API"],
    gradient: "from-accent-500/20 to-accent-600/10",
    border: "border-accent-500/30",
    iconColor: "text-accent-400",
  },
  {
    icon: FaMobileAlt,
    accentIcon: SiFlutter,
    title: "Mobile App Development",
    description:
      "Crafting cross-platform mobile applications with Flutter that feel native on both iOS and Android. Beautiful UIs with smooth performance.",
    tags: ["Flutter", "iOS", "Android"],
    gradient: "from-sky-500/20 to-sky-900/10",
    border: "border-sky-500/30",
    iconColor: "text-sky-400",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="bg-dark-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
            What I{" "}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-gray-400">
            End-to-end development services tailored to bring your ideas to life.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {services.map(({ icon: Icon, title, description, tags, gradient, border, iconColor }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-2xl border ${border} bg-gradient-to-br ${gradient} bg-dark-card p-6 backdrop-blur-sm`}
              >
                <div className={`mb-4 inline-flex rounded-xl bg-dark-surface p-3 ${iconColor}`}>
                  <Icon className="text-2xl" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-400">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-dark-border bg-dark-surface px-3 py-1 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
