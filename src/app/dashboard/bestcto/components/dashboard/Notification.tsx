"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface NotificationProps {
  message: string
  visible: boolean
}

export default function Notification({ message, visible }: NotificationProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white shadow-xl rounded-xl px-6 py-4 border border-green-200"
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-gray-900">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
