"use client"

// React Native version - fully native, no web dependencies

import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Animated, Linking } from "react-native"
import type { AutoserviceProject } from "./types"

export interface AutoserviceCardProps {
  project: AutoserviceProject
  variant?: "default" | "featured" | "glass"
  index?: number
  onAction?: (projectId: string) => void
}

export function AutoserviceCard({ project, variant = "default", index = 0, onAction }: AutoserviceCardProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current
  const opacityAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start()
  }, [index, opacityAnim])

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  const handlePress = async () => {
    if (project.link) {
      await Linking.openURL(project.link)
    }
    if (onAction) {
      onAction(project.id)
    }
  }

  const Icon = project.icon as any

  return (
    <Animated.View
      style={[
        styles.card,
        variant === "featured" && styles.cardFeatured,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.touchable}
      >
        {/* Icon */}
        <View style={[styles.iconContainer, variant === "featured" && styles.iconFeatured]}>
          <Icon width={36} height={36} color="#0066FF" />
        </View>

        {/* Content */}
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.description}>{project.description}</Text>

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{project.linkText}</Text>
          </View>

          <View style={[styles.badge, getBadgeStyle(project.badge.variant)]}>
            <Text style={[styles.badgeText, getBadgeTextStyle(project.badge.variant)]}>{project.badge.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

function getBadgeStyle(variant: "active" | "soon" | "open") {
  switch (variant) {
    case "active":
      return { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }
    case "soon":
      return { backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }
    case "open":
      return { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }
  }
}

function getBadgeTextStyle(variant: "active" | "soon" | "open") {
  switch (variant) {
    case "active":
      return { color: "#15803D" }
    case "soon":
      return { color: "#B45309" }
    case "open":
      return { color: "#1E40AF" }
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.8)",
    padding: 24,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardFeatured: {
    backgroundColor: "rgba(239, 246, 255, 0.5)",
    borderColor: "rgba(0, 102, 255, 0.2)",
  },
  touchable: {
    flex: 1,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "rgba(0, 102, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconFeatured: {
    backgroundColor: "rgba(0, 102, 255, 0.12)",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  button: {
    backgroundColor: "#0066FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
})
