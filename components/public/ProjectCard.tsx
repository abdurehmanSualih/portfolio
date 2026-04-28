"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { ProjectType } from "@prisma/client";
import type { ProjectWithSkills } from "@/actions/projects";

const typeLabels: Record<ProjectType, string> = {
  WEB: "Web",
  MOBILE: "Mobile",
  FULLSTACK: "Fullstack",
};

const typeBadgeColors: Record<ProjectType, string> = {
  WEB: "bg-primary-500/20 text-primary-300 border-primary-500/30",
  MOBILE: "bg-accent-500/20 text-accent-400 border-accent-500/30",
  FULLSTACK: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

interface ProjectCardProps {
  project: ProjectWithSkills;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, projectType, githubUrl, demoUrl, imageUrl, skills } = project;

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(99,102,241,0.15)" }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-dark-border bg-dark-card"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-dark-surface">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-dark-bg/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl text-dark-border">{"</>"}</span>
          </div>
        )}

        {/* Project type badge */}
        <span
          className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${typeBadgeColors[projectType]}`}
        >
          {typeLabels[projectType]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-400">{description}</p>

        {/* Tech stack badges */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map(({ skill }) => (
              <span
                key={skill.id}
                className="rounded-full border border-dark-border bg-dark-surface px-2.5 py-0.5 text-xs text-gray-300"
              >
                {skill.name}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-1">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
              aria-label={`GitHub repository for ${title}`}
            >
              <FiGithub className="h-4 w-4" />
              <span>Code</span>
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-accent-400"
              aria-label={`Live demo or APK for ${title}`}
            >
              <FiExternalLink className="h-4 w-4" />
              <span>{projectType === "MOBILE" ? "APK" : "Demo"}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
