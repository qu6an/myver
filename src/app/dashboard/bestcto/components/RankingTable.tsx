'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface Row { pos: number; name: string; score: number; }

export default function RankingTable({ rows }: { rows: Row[] }) {
  return (
    <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-xl font-semibold mb-4">🏆 Турнирная таблица</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2">#</th>
            <th>Участник</th>
            <th>Баллы</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <motion.tr key={i} whileHover={{ backgroundColor: '#f7faff' }} className="border-b">
              <td className="py-2 font-bold">{r.pos}</td>
              <td>{r.name}</td>
              <td className="font-semibold text-[color:var(--primary)]">{r.score}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
