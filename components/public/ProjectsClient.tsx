"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectType } from "@prisma/client";
import type { ProjectWithSkills } from "@/actions/projects";
import ProjectCard from "./ProjectCard";

type Filter = "ALL" | ProjectType;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "ALL" },
  { label: "Web", value: "WEB" },
  { label: "Mobile", value: "MOBILE" },
  { label: "Fullstack", value: "FULLSTACK" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

interface ProjectsClientProps {
  projects: ProjectWithSkills[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");

  const filtered =
    activeFilter === "ALL"
      ? projects
      : projects.filter((p) => p.projectType === activeFilter);

  return (
    <>
      {/* Filter buttons */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
              activeFilter === value
                ? "border-primary-500 bg-primary-500/20 text-primary-300"
                : "border-dark-border bg-dark-surface text-gray-400 hover:border-primary-500/50 hover:text-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <motion.div key={project.id} variants={cardVariants} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <motion.p
              variants={cardVariants}
              className="col-span-full text-center text-gray-500"
            >
              No projects found for this filter.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
