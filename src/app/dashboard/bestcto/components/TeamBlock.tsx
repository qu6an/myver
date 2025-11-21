// src/app/dashboard/bestcto/TeamBlock.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

interface Member {
  role: string;
  name: string;
  score: number;
}

interface TeamBlockProps {
  members: Member[];
  totalScore: number;
  cityRank: number;
}

export default function TeamBlock({ members, totalScore, cityRank }: TeamBlockProps) {
  return (
    <motion.div
      className="rounded-2xl border bg-white/60 backdrop-blur p-6 shadow-sm transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Статистика */}
      <div className="p-4 mb-6 bg-gray-50 border rounded-xl">
        <h3 className="text-lg font-semibold mb-1">КОМАНДНЫЙ ЗАЧЁТ</h3>

        <p className="text-3xl font-bold text-[color:var(--primary)]">
          {totalScore} баллов
        </p>

        <p className="text-sm text-gray-500">Сумма лучших баллов по ролям</p>

        <p className="mt-2 text-lg font-medium">
          Место в Москве: {cityRank} 🏆
        </p>
      </div>

      {/* Заголовок */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        👥 Ваша команда
      </h2>

      {/* Состав */}
      <div className="space-y-3">
        {members.map((m, i) => (
          <motion.div
            key={i}
            className="flex justify-between p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition hover:translate-x-1"
            whileHover={{ x: 4 }}
          >
            <span className="font-medium w-32 md:w-40">{m.role}</span>
            <span className="flex-1">{m.name}</span>
            <span className="font-bold text-[color:var(--primary)]">
              {m.score} баллов
            </span>
          </motion.div>
        ))}

        {/* Кнопка */}
        <div className="p-4 rounded-xl border-dashed border-2 border-[color:var(--primary)] text-center bg-white/40">
          <button className="mt-2 px-4 py-2 rounded-xl bg-[color:var(--primary)] text-white shadow hover:shadow-lg transition">
            Пригласить участника
          </button>
        </div>
      </div>
    </motion.div>
  );
}
