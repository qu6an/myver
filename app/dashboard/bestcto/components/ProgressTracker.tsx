import React from 'react'
import { motion } from 'framer-motion'

export default function ProgressTracker({ steps }: { steps: Array<{ label: string; date: string; state?: 'completed' | 'current' | 'pending' }> }) {
  const percent = Math.round(steps.filter(s => s.state === 'completed').length / Math.max(1, steps.length) * 100)
  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="bg-white rounded-2xl p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-lg">Ваш путь к победе</div>
        <div className="text-sm text-slate-500">Прогресс: {percent}%</div>
      </div>

      <div className="relative">
        <div className="h-1 bg-slate-100 rounded-full" />
        <motion.div style={{ width: `${percent}%` }} className="absolute left-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" layout />
        <div className="flex justify-between mt-4">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center text-center w-24">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: s.state === 'current' ? 1.05 : 1 }}
                className={
                  (s.state === 'completed' ? 'w-12 h-12 rounded-full flex items-center justify-center font-semibold bg-indigo-600 text-white' :
                    s.state === 'current' ? 'w-12 h-12 rounded-full flex items-center justify-center font-semibold bg-pink-500 text-white animate-pulse' :
                    'w-12 h-12 rounded-full flex items-center justify-center font-semibold bg-white border border-slate-200 text-slate-600')
                }
              >
                {s.state === 'completed' ? '✓' : s.state === 'current' ? '▶' : idx + 1}
              </motion.div>
              <div className="text-sm mt-2 font-medium text-slate-700">{s.label}</div>
              <div className="text-xs text-slate-400">{s.date}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
