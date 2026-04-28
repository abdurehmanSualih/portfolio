"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="rounded-full border border-dark-border bg-dark-surface px-3 py-1 text-sm text-gray-300 cursor-default"
    >
      {name}
    </motion.span>
  );
}
