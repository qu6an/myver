import React from 'react'
import { motion } from 'framer-motion'

export default function TestCard({ model, onPrimary }: { model: { id: string; title: string; status: string; progressPercent: number; meta?: string }; onPrimary?: (id: string)=>void }) {
  return (
    <motion.div whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }} className="rounded-xl p-4 shadow bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold">{model.title}</div>
        <div className={'text-xs font-semibold px-3 py-1 rounded-full ' + (model.status==='active'?'bg-pink-50 text-pink-600': model.status==='completed'?'bg-green-50 text-green-600':'bg-yellow-50 text-amber-600')}>{model.status}</div>
      </div>
      <div className="mb-3">
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${model.progressPercent}%` }} className="h-full bg-gradient-to-r from-indigo-500 to-pink-500" />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <div>Прогресс: {Math.round(model.progressPercent)}%</div>
          <div>{model.meta}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>onPrimary?.(model.id)} className="flex-1 bg-pink-500 text-white rounded-lg py-2 font-semibold">{model.status==='active'?'Продолжить':'Открыть'}</button>
        <button className="flex-0 bg-white border border-slate-200 rounded-lg py-2 px-3">Анализ</button>
      </div>
    </motion.div>
  )
}
