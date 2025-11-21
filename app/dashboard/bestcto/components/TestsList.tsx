'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface Test { title: string; status: 'active'|'completed'|'upcoming'; date: string; progress: number; }

export default function TestsList({ tests }: { tests: Test[] }) {
  return (
    <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">📝 Все тесты</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tests.map((t, i) => (
          <motion.div key={i} className="p-4 border rounded-xl" whileHover={{ scale: 1.02 }}>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.status==='active'? 'bg-pink-100 text-pink-600' : t.status==='completed'? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
              {t.status}
            </span>
            <h3 className="mt-3 font-semibold">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.date}</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="h-2 rounded bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)]" style={{width:`${t.progress}%`}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{t.progress}% выполнено</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
