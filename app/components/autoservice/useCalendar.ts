"use client"

import { useState, useEffect, useCallback } from "react"
import type { CalendarEvent } from "./types"

export interface UseCalendarOptions {
  initialEvents?: CalendarEvent[]
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useCalendar({
  initialEvents = [],
  autoRefresh = false,
  refreshInterval = 60000,
}: UseCalendarOptions = {}) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [loading, setLoading] = useState(false)

  const addEvent = useCallback((event: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    setEvents((prev) => [...prev, newEvent].sort((a, b) => a.date.getTime() - b.date.getTime()))
  }, [])

  const removeEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }, [])

  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev
        .map((event) => (event.id === id ? { ...event, ...updates } : event))
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    )
  }, [])

  const getUpcomingEvents = useCallback(
    (days = 7): CalendarEvent[] => {
      const now = new Date()
      const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
      return events.filter((event) => event.date >= now && event.date <= future)
    },
    [events],
  )

  const getEventsByType = useCallback(
    (type: CalendarEvent["type"]): CalendarEvent[] => {
      return events.filter((event) => event.type === type)
    },
    [events],
  )

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setLoading(true)
      // Simulate refresh
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  return {
    events,
    loading,
    addEvent,
    removeEvent,
    updateEvent,
    getUpcomingEvents,
    getEventsByType,
  }
}
