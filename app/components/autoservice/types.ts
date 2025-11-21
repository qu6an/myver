import type React from "react"
// Core types for Autoservice Card components

export type BadgeVariant = "active" | "soon" | "open"

export interface AutoserviceProject {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  badge: {
    text: string
    variant: BadgeVariant
  }
  link?: string
  linkText: string
  featured?: boolean
}

export interface AutoserviceFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export interface TwinkleAnimation {
  id: string
  x: number
  y: number
  delay: number
  duration: number
  size: number
}

export interface CalendarEvent {
  id: string
  title: string
  date: Date
  type: "quiz" | "competition" | "training" | "other"
  description?: string
}
