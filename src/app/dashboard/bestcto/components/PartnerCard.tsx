"use client"

import { motion } from "framer-motion"
import { Handshake } from "lucide-react"

export default function PartnerCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-amber-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Handshake className="w-5 h-5 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Генеральный партнер</h2>
      </div>

      <div className="bg-white rounded-xl p-6 text-center">
        <img
          src="https://autocom.parts/i/banners/everycar_partnrs/LYNX.svg"
          alt="LYNXauto"
          className="h-16 mx-auto mb-4"
        />
        <h3 className="text-lg font-bold text-gray-900 mb-2">LYNXauto</h3>
        <p className="text-sm text-gray-600">Официальный генеральный партнер конкурса "АВТОСЕРВИС ГОДА 2025"</p>
      </div>
    </motion.div>
  )
}
