"use client"

import { motion } from "framer-motion"
import type { AutoserviceProject } from "./types"
import { badgeVariants, cardVariants, animationVariants } from "./variants"
import { useTwinkle } from "./useTwinkle"

export interface AutoserviceCardProps {
  project: AutoserviceProject
  variant?: keyof typeof cardVariants
  index?: number
  onAction?: (projectId: string) => void
  showTwinkle?: boolean
}

export function AutoserviceCard({
  project,
  variant = "default",
  index = 0,
  onAction,
  showTwinkle = false,
}: AutoserviceCardProps) {
  const Icon = project.icon
  const styles = cardVariants[variant]
  const badgeStyle = badgeVariants[project.badge.variant]
  const twinkles = useTwinkle({ count: showTwinkle ? 15 : 0 })

  const handleClick = () => {
    if (onAction) {
      onAction(project.id)
    }
  }

  return (
    <motion.div
      initial={animationVariants.fadeInUp.initial}
      whileInView={animationVariants.fadeInUp.animate}
      viewport={{ once: true }}
      transition={{ ...animationVariants.fadeInUp.transition, delay: index * 0.1 }}
      whileHover={animationVariants.hoverLift.whileHover}
      className={`group relative ${styles.container} border rounded-3xl p-8 ${styles.hover} transition-all duration-300 h-full flex flex-col overflow-hidden`}
    >
      {/* Twinkle Effect */}
      {showTwinkle && (
        <div className="absolute inset-0 pointer-events-none">
          {twinkles.map((twinkle) => (
            <motion.div
              key={twinkle.id}
              className="absolute rounded-full bg-blue-400/30"
              style={{
                left: `${twinkle.x}%`,
                top: `${twinkle.y}%`,
                width: `${twinkle.size}px`,
                height: `${twinkle.size}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: twinkle.duration,
                delay: twinkle.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>
      )}

      {/* Icon */}
      <motion.div
        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${styles.icon} transition-transform duration-300`}
        whileHover={animationVariants.iconPulse.whileHover}
      >
        <Icon className="w-9 h-9" />
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{project.title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{project.description}</p>

      {/* Actions */}
      <div className="flex items-center justify-between mt-auto">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-700 px-5 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
          >
            {project.linkText}
          </a>
        ) : (
          <button
            onClick={handleClick}
            className="text-sm font-semibold text-white px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          >
            {project.linkText}
          </button>
        )}

        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${badgeStyle.container}`}>
          {project.badge.text}
        </span>
      </div>
    </motion.div>
  )
}
