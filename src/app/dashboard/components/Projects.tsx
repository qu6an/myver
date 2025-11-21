import React\nimport { useModal } from './ModalProvider' from 'react'
import { motion } from 'framer-motion'

const projects = [
  { title: 'Автомобильная викторина', desc: 'Зарабатывайте очки за правильные ответы.', tag: 'Активно' },
  { title: 'EVERYCAR', desc: 'Постоянная программа мотивации — уровни, задания, бонусы.', tag: 'Идёт набор', featured: true },
  { title: 'Автосервис года', desc: 'Конкурс с учётом показателей и репутации.', tag: 'Скоро' },
  { title: 'Аккредитация производителем', desc: 'Получите официальную аккредитацию.', tag: 'Доступно' },
  { title: 'Академия СТО', desc: 'Обучаем управлению и продажам.', tag: 'Доступно' },
  { title: 'MyTeam', desc: 'Партнёрская программа с колл-центром.', tag: 'Доступно' },
]

export default function Projects(){
  const modal = useModal();
  return (
    <section id="projects" className="py-20">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Наши проекты</h2>
        <p className="text-center text-slate-600 mb-8">Шесть ключевых возможностей для роста вашего автосервиса</p>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article key={i} className={"bg-white/75 border rounded-xl p-6 shadow" + (p.featured ? ' ring-1 ring-brand/30' : '')}
              initial={{ y:20, opacity:0 }} whileInView={{ y:0, opacity:1 }} transition={{ delay: i*0.05 }}>
              <div className="w-16 h-16 rounded-lg bg-brand/10 flex items-center justify-center text-brand text-2xl mb-4">
                <i className="fa-solid fa-cog"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-slate-600 mb-4">{p.desc}</p>
              <div className="flex items-center justify-between">
                <button className="px-3 py-2 border rounded-xl" onClick={() => { const m = modal; if (m) m.show(<div><h3 className='font-semibold'>{p.title}</h3><p className='text-slate-600'>{p.desc}</p></div>, p.title); }}>Подробнее</button>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">{p.tag}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
