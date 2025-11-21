"use client"

import { useState, useEffect } from "react"
import type { TwinkleAnimation } from "./types"

export interface UseTwinkleOptions {
  count?: number
  minSize?: number
  maxSize?: number
  minDuration?: number
  maxDuration?: number
}

export function useTwinkle({
  count = 20,
  minSize = 2,
  maxSize = 4,
  minDuration = 2,
  maxDuration = 4,
}: UseTwinkleOptions = {}): TwinkleAnimation[] {
  const [twinkles, setTwinkles] = useState<TwinkleAnimation[]>([])

  useEffect(() => {
    const generateTwinkles = (): TwinkleAnimation[] => {
      return Array.from({ length: count }, (_, i) => ({
        id: `twinkle-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: minDuration + Math.random() * (maxDuration - minDuration),
        size: minSize + Math.random() * (maxSize - minSize),
      }))
    }

    setTwinkles(generateTwinkles())
  }, [count, minSize, maxSize, minDuration, maxDuration])

  return twinkles
}
