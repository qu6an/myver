// Design variants and styling configurations

export const badgeVariants = {
  active: {
    container: "bg-green-50 text-green-700 border-green-200",
    glow: "shadow-green-100",
  },
  soon: {
    container: "bg-amber-50 text-amber-700 border-amber-200",
    glow: "shadow-amber-100",
  },
  open: {
    container: "bg-blue-50 text-blue-700 border-blue-200",
    glow: "shadow-blue-100",
  },
} as const

export const cardVariants = {
  default: {
    container: "bg-white/70 backdrop-blur-md border-gray-200/80",
    hover: "hover:border-blue-600 hover:shadow-2xl",
    icon: "bg-blue-50 text-blue-600",
  },
  featured: {
    container: "bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-blue-200",
    hover: "hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-100/50",
    icon: "bg-blue-100 text-blue-600",
  },
  glass: {
    container: "bg-white/50 backdrop-blur-xl border-white/30",
    hover: "hover:border-white/60 hover:shadow-xl",
    icon: "bg-white/70 text-blue-600",
  },
} as const

export const animationVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 },
  },
  hoverLift: {
    whileHover: { y: -8, transition: { duration: 0.3 } },
  },
  iconPulse: {
    whileHover: { scale: 1.1, transition: { duration: 0.3 } },
  },
} as const
