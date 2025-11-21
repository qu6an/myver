'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface Step { month: string; label: string; status: 'done'|'current'|'next'; }

export default function ProgressRoad({ steps }: { steps: Step[] }) {
  return (
    <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">🏁 Ваш путь к победе</h2>
      <div className="relative">
        <div className="absolute top-6 left-0 right-0 h-1 bg-[color:var(--border)] rounded"></div>
        <div className="flex justify-between relative z-10">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center w-20">
              <div className={`step-icon ${s.status==='done'? 'bg-[color:var(--primary)] text-white':'bg-white border'}`}>
                {s.status==='done'? '✓' : i+1}
              </div>
              <div className="text-sm mt-2 font-medium">{s.month}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
