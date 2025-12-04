'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

interface RankingRow {
  position: number;
 name: string;
 autoservice: string;
  city: string;
  score: number;
  progress: number;
  isCurrentUser?: boolean;
}

interface RankingTableProps {
  rows: RankingRow[];
}

export default function RankingTable({ rows }: RankingTableProps) {
  const [activeCategory, setActiveCategory] = useState('mechanic');
  const [activeRegion, setActiveRegion] = useState('moscow');

  const categories = [
    { id: 'mechanic', label: 'Механики' },
    { id: 'consultant', label: 'Мастер-консультанты' },
    { id: 'manager', label: 'Руководители' },
    { id: 'team', label: 'Командный зачет' },
  ];

  const regions = [
    { id: 'moscow', label: 'Москва' },
    { id: 'region', label: 'Область' },
    { id: 'federal', label: 'Федеральный округ' },
    { id: 'country', label: 'Страна' },
  ];

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <span className="p-2 bg-indigo-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-60" viewBox="0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 03 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </span>
          Рейтинги
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium text-indigo-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 0 011 1v2.101a7.002 7.002 0 011.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Обновить
        </button>
      </div>

      <div className="ranking-filters mb-6">
        <div className="flex flex-wrap gap-3 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-3">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeRegion === region.id
                  ? 'bg-indigo-60 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Место</TableHead>
              <TableHead>Участник</TableHead>
              <TableHead>Автосервис</TableHead>
              {activeRegion !== 'moscow' && <TableHead>Город</TableHead>}
              <TableHead className="text-right">Баллы</TableHead>
              <TableHead className="w-[150px]">Прогресс</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow 
                key={index} 
                className={`${row.isCurrentUser ? 'bg-indigo-50' : ''} hover:bg-gray-50`}
              >
                <TableCell className="font-medium">{row.position}</TableCell>
                <TableCell className={row.isCurrentUser ? 'font-bold' : ''}>
                  {row.name} {row.isCurrentUser ? '(Вы)' : ''}
                </TableCell>
                <TableCell>{row.autoservice}</TableCell>
                {activeRegion !== 'moscow' && <TableCell>{row.city}</TableCell>}
                <TableCell className="text-right font-semibold text-indigo-600">{row.score}</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" 
                      style={{ width: `${row.progress}%` }}
                    ></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
 );
}
