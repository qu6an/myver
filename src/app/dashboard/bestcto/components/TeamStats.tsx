// TeamStats.tsx — полностью Server Component, без JS, с Tailwind-анимациями
import React from 'react';


interface TeamStatsProps {
totalScore: number;
cityRank: number;
}


export default function TeamStats({ totalScore, cityRank }: TeamStatsProps) {
return (
<div className="rounded-2xl border bg-white/60 backdrop-blur p-6 shadow-sm flex flex-col gap-1 transition hover:shadow-md">
<h3 className="text-lg font-semibold text-gray-800 tracking-wide">
КОМАНДНЫЙ ЗАЧЁТ
</h3>


<p className="text-4xl font-bold text-[color:var(--primary)] leading-tight">
{totalScore} баллов
</p>


<p className="text-sm text-gray-500">Сумма лучших баллов по ролям</p>


<div className="pt-2 mt-2 border-t">
<p className="text-lg font-medium text-gray-700">
Место в Москве: <span className="font-bold">{cityRank}</span> 🏆
</p>
</div>
</div>
);
}