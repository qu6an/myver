import React from 'react'
import { motion } from 'framer-motion'

export default function PrizesGrid() {
  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="bg-white rounded-2xl p-4 shadow">
      <div className="font-semibold mb-3">Призы в вашей номинации</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white">
            <div className="text-lg font-bold">1 место</div>
            <div className="text-sm">Лучший механик</div>
          </div>
          <div className="p-4 bg-white">
            <div className="text-2xl font-extrabold text-indigo-600">30 000 ₽</div>
            <div className="text-sm text-slate-500 mt-2">Сертификат на оборудование и инструменты для профессионального автосервиса</div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-gray-400 to-gray-600 text-white">
            <div className="text-lg font-bold">2 место</div>
            <div className="text-sm">Лучший механик</div>
          </div>
          <div className="p-4 bg-white">
            <div className="text-2xl font-extrabold text-indigo-600">15 000 ₽</div>
            <div className="text-sm text-slate-500 mt-2">Сертификат на профессиональные инструменты и оборудование</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
