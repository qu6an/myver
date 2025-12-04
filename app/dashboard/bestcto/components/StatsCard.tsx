'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface Stat { label: string; value: number; }

export default function StatsCard({ stats }: { stats: Stat[] }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">📊 Индивидуальный зачет</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((item, i) => (
          <motion.div key={i} className="p-4 rounded-xl border" whileHover={{ scale: 1.02 }}>
            <div className="text-3xl font-bold text-[color:var(--primary)]">{item.value}</div>
            <div className="text-gray-600 text-sm">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
