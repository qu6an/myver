"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, Check, Clock, Lock } from "lucide-react"

interface CertificationCardProps {
  onNotify: (message: string) => void
}

const certifications = [
  { logo: "https://autocom.parts/i/banners/everycar_partnrs/arnezi.svg", name: "ARNEZI", status: "completed" as const },
  {
    logo: "https://autocom.parts/i/banners/everycar_partnrs/azumi_logo.svg",
    name: "AZUMI",
    status: "completed" as const,
  },
  { logo: "https://autocom.parts/i/banners/everycar_partnrs/Febest.svg", name: "FEBEST", status: "pending" as const },
  { logo: "https://autocom.parts/i/banners/everycar_partnrs/LYNX.svg", name: "LYNXauto", status: "pending" as const },
  { logo: "https://autocom.parts/i/banners/everycar_partnrs/LYNX.svg", name: "SAKURA", status: "locked" as const },
  { logo: "https://autocom.parts/i/banners/everycar_partnrs/LYNX.svg", name: "CTR", status: "locked" as const },
]

export default function CertificationCard({ onNotify }: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Аттестация от производителей</h2>
        </div>
        <button
          onClick={() => onNotify("Все программы загружены")}
          className="flex items-center gap-2 px-4 py-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium text-indigo-700"
        >
          <ExternalLink className="w-4 h-4" />
          Все программы
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 text-center"
          >
            {/* Status Badge */}
            <div className="absolute -top-2 -right-2 z-10">
              {cert.status === "completed" && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
              {cert.status === "pending" && (
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              )}
              {cert.status === "locked" && (
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <img src={cert.logo || "/placeholder.svg"} alt={cert.name} className="h-12 mx-auto mb-3 object-contain" />
            <div className="font-semibold text-sm text-gray-900 mb-3">{cert.name}</div>

            {cert.status === "completed" && (
              <button
                onClick={() => onNotify(`Сертификат ${cert.name} открыт`)}
                className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs font-medium"
              >
                Сертификат
              </button>
            )}
            {cert.status === "pending" && (
              <button
                onClick={() => onNotify(`Аттестация ${cert.name} начата`)}
                className="w-full px-3 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors text-xs font-medium"
              >
                Пройти
              </button>
            )}
            {cert.status === "locked" && (
              <button
                disabled
                className="w-full px-3 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed text-xs font-medium"
              >
                Заблокировано
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
